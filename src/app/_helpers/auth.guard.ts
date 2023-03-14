import { Injectable } from "@angular/core"
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router"
import { Observable } from "rxjs"
import { TokenStorageService } from "../Services/token-storage.service";


@Injectable({
    providedIn: 'root'
  })
  export class AuthGuardService implements CanActivate {
  
    constructor(
      private router: Router,
      private tokenStorage: TokenStorageService
    ) { }
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
        
  
        if(this.tokenStorage.isLogged()){
          return true
        }
  
        return this.router.navigate(['auth']);
    }
    
  }  