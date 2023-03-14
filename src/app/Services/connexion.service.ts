import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const env = environment.AUTH_API;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ConnexionService {
  constructor(private http: HttpClient) { }
  // login(credentials: ICredential): Observable<IToken> {
  //   return this.http.post<IToken>(this.url, credentials)
  //   // post(
  //     // this.url + 'signin', 
  //   // {
  //   //   'username': credentials.username,
  //   //   'password': credentials.password
  //   // }, httpOptions
    
  //   // );
  // }

  login(user: { username: string; password: string; }): Observable<any> {
    return this.http.post(
      // env + '/signup'
      'http://localhost:8080/api/auth/signin',user
      // {
      //   // usernameOrEmail,
      //   // password,
      //   username: user.username,
      //   // email: user.email,
      //   password: user.password
      // },
      // httpOptions
    );
  }

  // inscription(nom: string, prenom: string, username:string,email:string,numero:string, password: string): Observable<any> {
  //   return this.http.post(
  //     env + '/inscription',
  //     {
  //       nom,
  //       prenom,
  //       username,
  //       email,
  //       numero,
  //       password,
  //       "roles":[
  //         "adminuser"
  //     ]
  //     },
  //     httpOptions
  //   );
  // }
  inscription(
    username: string,
    email: string,
    password: string,
    confirmpassword:string,
    role:string
  ) : Observable<any>{
    let data = new FormData();

    data.append('username', username);
    data.append('email', email);
    data.append('password', password);
    data.append('confirmpassword', confirmpassword);
    data.append('role', role);
    let donne = {
      "username": username,
      "email":email,
      "password":password,
      "confirmpassword":confirmpassword,
      "role":[
        role
      ]
  }
  console.log(donne);
    return this.http.post(`http://localhost:8080/api/auth/signup`,donne);

  }

  modifier(id:any, username: string,
    email: string,
    password: string,
    confirmpassword:string,
    role:string, profile:File): Observable<any>{
    let formData =new FormData
    formData.append("username",username),
    formData.append("email",email),
    formData.append("password",password),
    formData.append("confirmpassword",confirmpassword),
    formData.append("role",role),
    formData.append("profile",profile)
    return this.http.put(`http://localhost:8080/devs/auth/utilisateur/modifier/${id}`,formData)
  }


  logout(): Observable<any> {
    const req = new HttpRequest('POST', env + 'signout', {}, httpOptions);
    return this.http.request(req);
  }
}
