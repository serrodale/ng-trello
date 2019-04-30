import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserForm } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

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
        private authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
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

        this.authenticationService.login(userForm).subscribe(_ => {
            setTimeout(() => this.router.navigate(['/']));
        });
    }

}
