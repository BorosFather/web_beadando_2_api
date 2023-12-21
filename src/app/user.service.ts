import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  secondUrl = 'https://reqres.in/api/users?per_page=12';

  getSecondUsers(): Observable<any> {
    
    return this.http.get(this.secondUrl);
  }
  getSecondUserById(userId: number): Observable<any> {
    return this.http.get(`${this.secondUrl}/${userId}`);
  }

  deleteSecondUser(userId: number): Observable<any> {
    return this.http.delete(`${this.secondUrl}/${userId}`);
  }

  updateSecondUser(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.secondUrl}/${userId}`, userData);
  }

  createSecondUser(userData: any): Observable<any> {
    return this.http.post(`${this.secondUrl}`, userData);
  }
}
