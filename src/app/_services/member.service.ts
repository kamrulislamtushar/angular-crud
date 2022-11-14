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
    return this.http.get<any>(`${environment.apiUrl}/players`);
  }

  getLiveScore() {
    return this.http.get<any>(`${environment.apiUrl}/games/points`);
  }

  addMember(data) {
    return this.http.post<any>(`${environment.apiUrl}/players`, data);
  }

  playGame(data) {
    return this.http.post<any>(`${environment.apiUrl}/games/roll/dice`, data);
  }
  deleteMember(id) {
    return this.http.delete<any>(`${environment.apiUrl}/players/` + id);
  }
  memberDetails(id) {
    return this.http.get<any>(`${environment.apiUrl}/members/` + id);
  }
  editMember(data, id) {
    return this.http.put<any>(`${environment.apiUrl}/members/` + id, data);
  }
}
