import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserCredentials } from '../model/user.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser: UserCredentials = this.authenticationService.getStoredUser();

        if (currentUser && currentUser.jwt) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.jwt}`
                }
            });
        }

        return next.handle(request);
    }
}