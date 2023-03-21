import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { UserManagementService } from '@app/user-management/user-management.service';
// import { MasterService } from '@app/master-management/master.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    // public userManagementService: UserManagementService,
    // public masterService: MasterService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = JSON.parse(localStorage.getItem('token')!);
    if (token) {
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'GET, POST, OPTIONS, PUT, PATCH, DELETE',
          'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
          Authorization: `Bearer ${token}`,
          'x-access-token': `${token}`
        },
      });
    }

    return next.handle(request);
  }
}
