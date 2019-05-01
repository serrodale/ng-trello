import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserCredentials } from 'src/app/model/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate() {
        const currentUser: UserCredentials = this.authenticationService.getStoredUser();

        if (currentUser) {
            return true;
        }

        // Si no la página se quedaría en blanco porque no se cargaría ningún componente
        this.router.navigate(['/login']);

        return false;
    }
}