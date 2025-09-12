import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Username:', username);
      console.log('Password:', password);
      this.login(username, password);
    }
  }

  private login(username: string, password: string): Subscription {
    return this.authenticationService.login(username, password).subscribe(isAuthenticated => {
        if(isAuthenticated) {
          console.log('Login successful');
          this.router.navigate(['/dashboard']);
        } else {
          console.log('Wrong credentials');
        }
    })
  }

}
