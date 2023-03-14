import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ICredential } from '../_interfaces/credential';
import { IToken } from '../_interfaces/token';
import { TokenStorageService } from './token-storage.service';

//JWT configuration
const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url ='http://localhost:8080/api/auth/signin'
  urlrole ='http://localhost:8080'
  constructor(private http: HttpClient,private tokenStorage: TokenStorageService) { }

  login(credentials: ICredential): Observable<IToken> {
    return this.http.post<IToken>(this.url, credentials)
    // post(
      // this.url + 'signin', 
    // {
    //   'username': credentials.username,
    //   'password': credentials.password
    // }, httpOptions
    
    // );
  }

  register(user: { username: string; email: string; password: string; }): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
  // register(user: { username: string; email: string; password: string; }): Observable<any> {
  //   return this.http.post(AUTH_API + 'signup', {
  //     username: user.username,
  //     email: user.email,
  //     password: user.password
  //   }, httpOptions).pipe(
  //     tap((data: any) => {
  //       this.tokenStorage.saveToken(data.accessToken); // Enregistrez le jeton d'accès dans le TokenStorageService
  //     })
  //   );
  // }
  // register(): string {
  //   return this.tokenStorage.getToken();
  // }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  listerole(): Observable<any> {
    return this.http.get(this.urlrole + `/api/auth/role` );
  }
}
