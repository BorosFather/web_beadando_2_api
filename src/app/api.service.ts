import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   apiUrl = 'https://reqres.in/api/users?per_page=12';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  
  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
  
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
  
  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put( "https://reqres.in/api/users/" + userId, userData);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post("https://reqres.in/api/users" , userData);
  }

}
