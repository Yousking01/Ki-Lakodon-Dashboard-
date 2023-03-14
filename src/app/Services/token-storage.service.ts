import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { NavController } from '@ionic/angular';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private router: Router,) { }

  signOut() {
    window.sessionStorage.clear();
  }
  //Fatou tutto
  saveToken(token: string): void{
    localStorage.setItem('token', token)
    // this.router.navigate(['/tabs/home']);
  }
  isLogged(): boolean{
    const token = localStorage.getItem('token')
    // console.log(token)
    return !! token
  }

  checkConnection(): boolean{
    const user = window.sessionStorage.getItem(USER_KEY)
    // console.log(token)
   if(user){
    return true
   }else{
    return false;
   }
  }

  clearToken(): void{
    localStorage.removeItem('token'),
    window.sessionStorage.clear(),
    // window.location.reload();
    // this.navCtrl.navigateRoot([{clearHistory: true}]);
      this.router.navigate(['/connexion']);
    
    
  }
  // reloadPage() {
  //   this.router.navigateByUrl('/tabs/home', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['']);
  //   });
  // }

  // clearTokenExpired(): void{
  //   localStorage.removeItem('token')
  //   this.router.navigate(['/'])
  // }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  // public saveToken(token: string) {
  //   window.sessionStorage.removeItem(TOKEN_KEY);
  //   window.sessionStorage.setItem(TOKEN_KEY, token);
  //   //pour stoker l'utilisateur
  //   // window.sessionStorage.removeItem(USER_KEY);
  //   // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  // }

  // public getToken(): any {
  //   return sessionStorage.getItem(TOKEN_KEY);
  // }

 

  // public getUser() {
  //   return JSON.parse(sessionStorage.getItem(USER_KEY));
  // }

 public saveUser(user:any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public recupererUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public connexionReussi(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

}
