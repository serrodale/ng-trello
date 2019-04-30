import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserForm } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    loading: boolean;
    submitted: boolean;
    formGroup: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirmation: ['', Validators.required]
        }, { validator: this.comparePasswords });
    }

    comparePasswords(formGroup: FormGroup): any {
        const password: string = formGroup.controls.password.value;
        const passwordConfirmation: string = formGroup.controls.passwordConfirmation.value;

        return password === passwordConfirmation ? null : { passwordsAreDifferent: true }     
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

        this.authenticationService.register(userForm).subscribe(_ => {
            // Para evitar parpadeos por si llega la respuesta muy rápido del servidor
            setTimeout(() => this.router.navigate(['/login']), 500);
        });
    }
}
