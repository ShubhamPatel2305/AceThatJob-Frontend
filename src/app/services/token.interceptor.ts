import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { request } from 'http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private router:Router){

  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if(token){
      req=req.clone({
        setHeaders:{Authorization:`Bearer ${token}`}
      });
    }
    return next.handle(req).pipe(
      catchError((err)=>{
        if(err instanceof HttpResponse){
          console.log(err.url);
          if(err.status===401 || err.status===403){
            if(this.router.url==='/login'){
              //do nothing as he has not yet logged in 
            }else{
              localStorage.removeItem('token');
              this.router.navigate(['/']);
            }
          }
        }
        return throwError(err);
      })
    );
      
  }
}