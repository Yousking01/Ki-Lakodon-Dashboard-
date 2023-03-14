import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { HttpHeaders } from '@capacitor/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  URL = "http://localhost:8080";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',Authorization: `Bearer ${this.tokenStorage.getToken()}`})
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  //Ajout De personne
  ajoutinscription(
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
}
