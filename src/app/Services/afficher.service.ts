import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const AUTH_API = 'http://localhost:8080/api/auth/';


const env = environment.AUTH_API;

@Injectable({
  providedIn: 'root'
})
export class AfficherService {
  API_AJOUTANNONCE = "http://localhost:8080";
  URL = "http://localhost:8080";
  // listuser:any;
  constructor(private http: HttpClient ) { }
  afficherChallenge() :Observable<any>{
    return this.http.get(`${env}/challenge/decroissant`);
  }


  afficherChallengeEncours() :Observable<any> {
    return this.http.get(this.API_AJOUTANNONCE + `/api/auth/annonce/lire`);
  }
  // Observable<any>{
  //   return this.http.get(`${AUTH_API}/annonce/lire`);
  // }

  afficherChallengeAvenir() :Observable<any>{
    return this.http.get(`${env}/challenge/avenir`);
  }
  afficherChallengeTerminer() :Observable<any>{
    return this.http.get(`${env}/challenge/terminer`);
  }

  afficherChallengeDecroissant() :Observable<any>{
    return this.http.get(`${env}/challenge/decroissant`);
  }

  listuser(): Observable<any> {
    return this.http.get(this.URL + `/api/auth/getAll`);
  }
  afficheruser() :Observable<any>{
    // return this.http.get(`${env}/utilisateur/afficheruser`);
    return this.http.get(this.URL + `/api/auth/getAll`);
  }
  afficherCategorie() :Observable<any>{
    return this.http.get(`${env}/cate/afficher`)
  }
  afficherTecnho() :Observable<any>{
    return this.http.get(`${env}/techo/afficher`)
  }
  afficherCritere() :Observable<any>{
    return this.http.get(`${env}/critere/afficher`)
  }
  afficherBareme() :Observable<any>{
    return this.http.get(`${env}/bareme/afficher`)
  }
  afficherCritereParIdChallenge(idChallenge:number) :Observable<any>{
    return this.http.get(`${env}/challenge/criteria/${idChallenge}`)
  }
  afficherParIdChallenge(idChallenge:number) :Observable<any>{
    return this.http.get(`${env}/challenge/afficher/${idChallenge}`)
  }

  graphiqueUser() :Observable<any>{
    // return this.http.get(`http://localhost:8080/devs/auth/utilisateur/afficheruser`)
    return this.http.get(this.URL + `/api/auth/getAll`);
  }


  solutions(idChallenge:number) :Observable<any>{
    return this.http.get(` http://localhost:8080/devs/auth/solution/challenges/${idChallenge}/solutions`)
  }
  notSolutions():Observable<any>{
    return this.http.get(` http://localhost:8080/devs/auth/solution/non-etat-1`)

  }

  classements(idChallenge:number) :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/solution/challenge/${idChallenge}`)
  }


  team(idChallenge:number,teamId:number) :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/teamusrs/afficherEquipeMembre/${idChallenge}/${teamId}`)
  }
}
