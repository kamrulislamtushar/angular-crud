import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, JsonpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User, Role } from '../_models';
let members = JSON.parse(localStorage.getItem('members')) || [];
const users: User[] = [
    {
        id: 1,
        email: 'admin@test.com',
        password: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        role: Role.Admin
    },
    {
        id: 2,
        email: 'executive@test.com',
        password: 'executive',
        firstName: 'Executive',
        lastName: 'User',
        role: Role.Executive
    }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(900))
            .pipe(dematerialize());

        function handleRoute() {
            // Accessing api calls so that dummy api call can act as actual api
            switch (true) {
                case url.endsWith('/login') && method === 'POST':
                    return authenticate();

                case url.endsWith('/members') && method === 'GET':
                    return getMembers();

                case url.endsWith('/members') && method === 'POST':
                    return addMember();

                case url.match(/\/members\/\d+$/) && method === 'DELETE':
                    return removeMembers();

                case url.match(/\/members\/\d+$/) && method === 'PUT':
                    return deleteMember();
                case url.match(/\/members\/\d+$/) && method === 'GET':
                    return memberDetails();
                default:
                    // Pass through any requests not handled above
                    return next.handle(request);
            }

        }

        // route functions

        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);
            if (!user) return error('Email or password is incorrect');
            return ok({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                token: `fake-jwt-token.${user.id}`
            });
        }
        function memberDetails() {
            if (!isLoggedIn()) {
                return unauthorized();
            } else {
                let id = idFromUrl();
                let member = members.filter(function (obj) {
                    return obj.id == id;
                });
                if (member.length > 0) {
                    return ok(member[0])
                } else {
                   return notFound("Member Not found")
                }

            }
        }
        function deleteMember() {
            if (!isLoggedIn() && !isAdmin()) {
                return unauthorized();
            } else {
                let id = idFromUrl();
                members = members.filter(function (obj) {
                    return obj.id !== id;
                });
                members.push(body)
                localStorage.removeItem('members')
                localStorage.setItem('members', JSON.stringify(members))
                return ok(members)
            }
        }
        function getMembers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(members);
        }
        function removeMembers() {
            if (!isLoggedIn() && !isAdmin()) {
                return unauthorized();
            } else {
                let id = idFromUrl();
                members = members.filter(function (obj) {
                    return obj.id !== id;
                });
                localStorage.removeItem('members')
                localStorage.setItem('members', JSON.stringify(members))
                return ok(members)
            }
        }

        function addMember() {
            if (!isLoggedIn() && !isAdmin()) {
                return unauthorized();
            } else {
              members.push(body)
              localStorage.removeItem('members')
              localStorage.setItem('members', JSON.stringify(members))
              return ok(members)

            }
        }

        // helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'unauthorized' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }

        function notFound(message) {
            return throwError({ status: 404, error: { message } });
        }
        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function isAdmin() {
            return isLoggedIn() && currentUser().role === Role.Admin;
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization').split('.')[1]);
            return users.find(x => x.id === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
