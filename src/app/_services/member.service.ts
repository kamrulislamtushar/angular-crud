import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private http: HttpClient
  ) { }

  getMembers() {
    return this.http.get<any>(`${environment.apiUrl}/members`);
  }
  addMember(data) {
    return this.http.post<any>(`${environment.apiUrl}/members`, data);
  }
  deleteMember(id) {
    return this.http.delete<any>(`${environment.apiUrl}/members/`+id);
  }
  memberDetails(id) {
    return this.http.get<any>(`${environment.apiUrl}/members/`+id);
  }
}
