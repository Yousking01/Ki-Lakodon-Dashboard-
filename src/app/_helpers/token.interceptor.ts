import { Injectable } from "@angular/core";
import { from, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { 
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS
 } from '@angular/common/http';

 import { Observable } from "rxjs";
import { TokenStorageService } from "../Services/token-storage.service";
// import { request } from "http";


 @Injectable()
 export class TokenInterceptor implements HttpInterceptor{

    constructor(private tokenStorage: TokenStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req)

        const token = this.tokenStorage.getToken()
        if(token !== null){
            let clone = req.clone({
                headers: req.headers.set('Authorization', 'bearer '+token)
            })
            console.log(clone)
            return next.handle(clone).pipe(
                catchError(error => {
                    console.log(error)

                    if(error.status === 401){
                        // this.tokenStorage.clearTokenExpired()
                    }
                    return throwError('Session Expired')
                })
            )
        }
        return next.handle(req);
    }
 }

 export const TokenInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
