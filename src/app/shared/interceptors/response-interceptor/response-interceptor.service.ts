import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { GlobalFunctionService } from 'app/shared/services/helper-services/global-function/global-function.service';

@Injectable()
export class ResponseInterceptorService implements HttpInterceptor {

  constructor(
    private _globalFunctionService: GlobalFunctionService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    this._globalFunctionService.relogin();
    
    return next.handle(request).do(
      // success responses
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      },
      // error responses
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // redirect to the login route
            // or show a modal
          }
        }
      });
  }
}