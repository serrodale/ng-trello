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

  formGroup: FormGroup;
  loading: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitted(): void {
    this.loading = true;

    const username: string = this.formGroup.controls.username.value;
    const password: string = this.formGroup.controls.password.value;
    const userForm: UserForm = new UserForm(username, password);

    this.authenticationService.register(userForm).subscribe(_ => {
        this.router.navigate(['/login']);
    });
  }
}
