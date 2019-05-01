import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorsService } from '../services/http-errors.service';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

    constructor(
        private httpErrorsService: HttpErrorsService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        return next.handle(request).pipe(
            catchError((error: any) => {
                if (error instanceof HttpErrorResponse) {
                    this.httpErrorsService.addError(error);
                }

                return of(error);
            }));
    
      }
      
}