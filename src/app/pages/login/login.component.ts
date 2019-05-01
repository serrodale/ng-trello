import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserForm } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { ErrorAlert } from 'src/app/model/alert.model';
import { HttpErrorsService } from 'src/app/services/http-errors.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loading: boolean;
    submitted: boolean;
    formGroup: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private httpErrorsService: HttpErrorsService,
        private authenticationService: AuthenticationService,
    ) {}

    ngOnInit(): void {
        this.subscribeToHttpErrors();
        this.createForm();
    }

    onSubmitted(): void {
        this.submitted = true;

        if (this.formGroup.invalid) {
            return;
        }

        this.loading = true;

        const username: string = this.formGroup.controls.username.value;
        const password: string = this.formGroup.controls.password.value;
        const userForm: UserForm = new UserForm(username, password);

        this.authenticationService.login(userForm).subscribe((successfulLogin: boolean) => {
            // Para evitar parpadeos por si llega la respuesta muy rápido del servidor
            setTimeout(() => {
                if (successfulLogin) {
                    this.router.navigate(['/']);
                } else {
                    this.alertsService.addErrorAlert(new ErrorAlert('El usuario no existe'));
                    this.loading = false;
                }
            }, 500);
        });
    }

    private subscribeToHttpErrors(): void {
        this.httpErrorsService.errors$.subscribe((error: HttpErrorResponse) => {
            if (error.status === 401) {
                this.alertsService.addErrorAlert(new ErrorAlert('Password incorrecto'));
                this.loading = false;
            }
        });
    }

    private createForm(): void {
        this.formGroup = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

}
