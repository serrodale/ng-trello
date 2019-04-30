import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
        private formBuilder: FormBuilder,
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
    }

}
