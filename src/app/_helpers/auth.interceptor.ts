import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
const UPDATE_RUC_LOGIC_APP = "https://prod-25.eastus2.logic.azure.com:443/workflows/ba2e772f85d2493b84d6e723450589ee/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cNR-TqWuEcpMAPNIFjLfOs2KG2jjUj5b8TM8zmkPc34";
const SERVICE_API_EMAIL = 'https://prod-53.eastus2.logic.azure.com:443/workflows/344b41cea2af418fa8abca356e4418fd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DeS4uTENIbg1W8ZRsQixnB_uRDCFXWN1gSgmV_3TOE0';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    console.log(req.url);
    if (token != null) {
      if(req.url == UPDATE_RUC_LOGIC_APP || req.url == SERVICE_API_EMAIL){
        console.log("VAMOS");
      }
      else{
        authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      }
    }
    
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];