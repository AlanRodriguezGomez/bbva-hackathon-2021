import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//const AUTH_API = 'http://localhost:8588/api/auth/';
//const AUTH_API = 'http://127.0.0.1:8588/users/';
const AUTH_API = 'http://3.94.90.58:8588/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        email,
        password
      },
      httpOptions
    );
  }

  register(company: string, nit_company: string, email: string, password: string, phone: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        company,
        nit_company,
        email,
        password,
        phone  
      },
      httpOptions
    );
  }

  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }
  
}
