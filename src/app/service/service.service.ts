import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  baseUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  apiKeyAuth: any = localStorage.getItem('apiKey');
  userIdAuth: any = localStorage.getItem('userId');

  setLocalStorage(apiKey: string, userId: number, userRole: string) {
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('userRole', userRole);
  }

  login(email: string, password: string): any {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }

  userList(): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKeyAuth,
      'user-id': this.userIdAuth,
    });
    return this.http.get<any>(`${this.baseUrl}/admin/user-list`, { headers });
  }

  createUser(payload: any): any {
    let userId = localStorage.getItem('userId') || '';
    let apiKey = localStorage.getItem('apiKey') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'user-id': userId,
    });
    return this.http.post<any>(`${this.baseUrl}/admin/user-create`, payload, {
      headers,
    });
  }

  removeUser(userId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKeyAuth,
      'user-id': this.userIdAuth,
    });
    return this.http.post<any>(
      `${this.baseUrl}/admin/user-remove`,
      { userId },
      { headers }
    );
  }

  userView() {
    let userId = localStorage.getItem('userId') || '';
    let apiKey = localStorage.getItem('apiKey') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'user-id': userId,
    });
    return this.http.post<any>(
      `${this.baseUrl}/user/view-profile`,
      { userId },
      { headers }
    );
  }
}
