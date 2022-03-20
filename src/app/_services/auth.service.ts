import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/cmdm/auth/';
const SERVICE_API = 'http://localhost:8081/cmdm/services/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  registerUser(nombres: string, apellidos: string, email: string, username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      nombres,
      apellidos,
      email,
      username,
      password
    });
  }

  registerEmpresa(empresa: string, ruc: string, user: []): Observable<any> {
    return this.http.post(SERVICE_API + 'microempresa', {
      empresa,
      ruc,
      evaluado: false,
      user
    });
  }

  
}
