import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AjoutsiteService {
  
  listeAnnonce() {
    throw new Error('Method not implemented.');
  }

  API_AJOUTSITE = "http://localhost:8080";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',Authorization: `Bearer ${this.tokenStorage.getToken()}`})
  };
  

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  ajoutsite(
    nomsitepopulaire : string,
    URL : string,
    image: string,
    username : string,
    email: string,
    password: string

    ) : Observable<any> {
    let data = new FormData();
    data.append('nomsitepopulaire', nomsitepopulaire);
    data.append('URL', URL);
    data.append('image',image);
    data.append('username',username);
    data.append('email',email);
    data.append('password',password);

    return this.http.post(this.API_AJOUTSITE + `/api/auth/siteweb/creer`,data)
  }

  listSite(): Observable<any> {
    return this.http.get(this.API_AJOUTSITE + `/api/auth/siteweb/lire`);
  }

  listSitebyId(id:number): Observable<any> {
    return this.http.get(this.API_AJOUTSITE + `/api/auth/siteweb/lire/${id}`);
  }
  // Ajoutez l'en-tête d'autorisation dans la requête GET
  
  // listSitebyId(id: number, options?: { headers: HttpHeaders }): Observable<any> {
  // return this.http.get<any>(`${this.API_AJOUTSITE}/api/auth/siteweb/lire/${id}`, options);
  // }
  // listSitebyId(id: number): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //   const options = { headers: headers };
  //   return this.http.get<any>(`${this.API_AJOUTSITE}/api/auth/siteweb/lire/${id}`, options);
  // }

  // listeAnnonceSiteByIdSite(id:number):Observable<any> {
  //   return this.http.get(`http://localhost:8080/api/auth/annonce/lireannonceparidsite/${id}`);
  // }
  
  listeAnnonceSiteByIdSite(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/auth/annonce/lireannonceparidsite/${id}`);
  }
  suprimersite(id:number): Observable<any> {
    return this.http.delete(this.API_AJOUTSITE + `/api/auth/siteweb/suprimer/${id}`);
   }
   modifiersite(
    nomsitepopulaire : string,
    URL : string,
    image: string,
    id: number
    ) : Observable<any> {
    let data = new FormData();
    data.append('nomsitepopulaire', nomsitepopulaire);
    data.append('URL', URL);
    data.append('image',image);

    return this.http.put(this.API_AJOUTSITE + `/api/auth/siteweb/modifier/${id}`,data)
  }
}
