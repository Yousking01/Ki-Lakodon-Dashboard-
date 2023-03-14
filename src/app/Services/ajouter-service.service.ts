import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const env = environment.AUTH_API;
@Injectable({
  providedIn: 'root'
})

export class AjouterServiceService {
API_AJOUTANNONCE = "http://localhost:8080";
  constructor(private http: HttpClient) { }
  AjouterChallenge(formData: FormData) {
    return this.http.post('http://localhost:8080/api/auth/annonce/creer/1/${idannonceur}/${id}', formData);
  }
  modifierChallenge(idannonce:number,formData: FormData) {
    return this.http.put(`http://localhost:8080/api/auth/annonce/modifier/${idannonce}`, formData);
  }
  supprimer(idannonce:number) {
    return this.http.put(this.API_AJOUTANNONCE + `/api/auth/annonce/suprimer/${idannonce}`,{});
  }

  supprimerUser(idUser:number) {
    return this.http.put(`http://localhost:8080/devs/auth/utilisateur/modifierS/${idUser}`,{});
  }
  AjouterCritere(formData: FormData) {
    return this.http.post('http://localhost:8080/devs/auth/critere/ajout', formData);
  }
  AjouterBareme(formData: FormData) {
    return this.http.post('http://localhost:8080/devs/auth/bareme/ajout', formData);
  }
  AjouterCate(formData: FormData) {
    return this.http.post('http://localhost:8080/devs/auth/cate/ajout', formData);
  }
  AjouterTechno(formData: FormData) {
    return this.http.post('http://localhost:8080/devs/auth/techo/ajout', formData);
  }
  Correction(etats:any,solutionId:number,critereIds:any): Observable<any> {
    let data= new FormData
    data.append("etats",etats),
    data.append("critereIds",critereIds)
    return this.http.post(`http://localhost:8080/devs/auth/correction/${solutionId}`, data);
  }
}
