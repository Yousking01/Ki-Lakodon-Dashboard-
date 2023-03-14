import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { constructor } from 'jasmine';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AjoutServiceService {

  API_AJOUTANNONCE = "http://localhost:8080";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',Authorization: `Bearer ${this.tokenStorage.getToken()}`,})
  };
  // 'Access-Control-Allow-Origin': 'http://localhost:8100'
  // httpOptions = {
  //   headers: new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${this.tokenStorage.getToken()}`,
  //     'Access-Control-Allow-Origin': 'http://localhost:8080',
  //     'Access-Control-Allow-Methods': 'POST',
  //     'Access-Control-Allow-Headers': 'Content-Type'
  //   })
  // };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService ) { }

  //AJOUT D'ANNONCE //
  ajoutannonce(titreannonce : string,
  descriptionannonce : string,
  prixannonce : string,
  image: string,
  dateDebut: any,
  dateFin: any,
  // ciblediffusionannonce: string,
  idannonceur:number,
  id:number) : Observable<any> {
    let data = new FormData();
    data.append('titreannonce', titreannonce);
    data.append('descriptionannonce', descriptionannonce);
    data.append('prixannonce', prixannonce);
    data.append('dateDebut', dateDebut);
    data.append('dateFin', dateFin);
    //data.append('idannonceur', idannonceur);
    // data.append('ciblediffusionannonce', ciblediffusionannonce);
    data.append('image', image);
    //let idanonne: any = 1

    return this.http.post(`http://localhost:8080/api/auth/annonce/creer/1/${idannonceur}/${id}`,data)
  }
  ////AJOUT DE L'annonceur
  ajoutannonceur(
    username: string,
    email: string,
    password: string,
    
    adrresseannonceur: string,
    numeroannonceur: string,
    budgetannonceur: any,
    // idespacepub:number,
    idKilakodon:number
    ) : Observable<any> {
        let data = {
        
          "email": email,
          "password": password,
          "username": username,
          "adrresseannonceur": adrresseannonceur,
          "numeroannonceur":numeroannonceur,
          "budgetannonceur":budgetannonceur
          
      };

        // data.append('email', email);
        // data.append('password', password);
        // data.append('username', username);
        // data.append('adrresseannonceur', adrresseannonceur);
        // data.append('numeroannonceur', numeroannonceur);
        // data.append('budgetannonceur', budgetannonceur);
        // data.append('idespacepub', idespacepub);
        // data.append('idKilakodon', idKilakodon);

        return this.http.post(`http://localhost:8080/api/auth/annonceur/creer/${idKilakodon}`,data)


    }

    

  // listPays(): Observable<any> {
  //   return this.http.get(this.API_AJOUTANNONCE + `/annonce/lire`);
  // }
  listekilakodon(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/auth/kilakodon/lire`);
  }

  listSite(): Observable<any> {
    return this.http.get(this.API_AJOUTANNONCE + `/api/auth/siteweb/lire`);
  }

  listAnnoncuer(): Observable<any> {
    return this.http.get(this.API_AJOUTANNONCE + `/api/auth/annonceur/lire`);
  }

  listeAnnonce(): Observable<any> {
    return this.http.get(this.API_AJOUTANNONCE + `/api/auth/annonce/lire`);
  }
  afficherChallenge(): Observable<any> {
    return this.http.get(this.API_AJOUTANNONCE + `/api/auth/annonce/lire`);
  }

 suprimerannonce(idannonce:number): Observable<any> {
  return this.http.delete(this.API_AJOUTANNONCE + `/api/auth/annonce/suprimer/${idannonce}`);
 }

 //MODIFIER D'ANNONCE //
 modifierannonce(titreannonce : string,
  descriptionannonce : string,
  prixannonce : string,
  image: string,
  dateDebut: string,
  dateFin: string,
  // ciblediffusionannonce: string,
  idannonce:number,
  // idsitepopulaire:number
  ) : Observable<any> {
    let data = new FormData();
    data.append('titreannonce', titreannonce);
    data.append('descriptionannonce', descriptionannonce);
    data.append('budgetannonce', prixannonce);
    data.append('dateDebut', dateDebut);
    data.append('dateFin', dateFin);
    //data.append('idannonceur', idannonceur);
    // data.append('ciblediffusionannonce', ciblediffusionannonce);
    data.append('image', image);
    //let idanonne: any = 1


    return this.http.put(`http://localhost:8080/api/auth/annonce/modifier/${idannonce}`,data)
  }


  ////lister Annonce par l'id de l'annonceur
  listeAnnonceByIdannonceur(id:number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/auth/annonce/lireannonceparidannonceur/${id}`);
  }

  listeAnnonceurById(id:number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/auth/annonceur/lireannonceurId/${id}`);
  }
  listeAnnonceById(idannonce:number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/auth/annonce/lire/${idannonce}`);
  }
}
