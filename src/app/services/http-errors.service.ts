import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorsService {

    private errorsSubject: Subject<HttpErrorResponse> = new Subject();
    errors$: Observable<HttpErrorResponse> = this.errorsSubject.asObservable();
    
    addError(error: HttpErrorResponse): void {
        this.errorsSubject.next(error);
    }

}