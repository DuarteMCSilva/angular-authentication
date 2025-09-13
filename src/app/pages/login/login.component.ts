import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SimpleFormComponent } from "../../shared/components/simple-form/simple-form.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, SimpleFormComponent, SimpleFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formConfig = {
    formTitle: 'Login',
    formFields: [
      { label: 'Username', type: 'text', name: 'username', required: true },
      { label: 'Password', type: 'password', name: 'password', required: true }
    ],
    formSubmitText: 'Sign In',
    footerLink: { text: "Don't have an account? Sign Up", url: '/register' }
  }

  errorMessage?: string;
  subscriptions: Subscription[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  onLogin(loginForm: FormGroup) {
    if (loginForm.valid) {
      const { username, password } = loginForm.value;
      console.log('Username:', username);
      console.log('Password:', password);
      this.login(username, password);
    }
  }

  onFormChanges() {
    this.errorMessage = undefined;
  }

  onLinkClick() {
    this.router.navigate([this.formConfig.footerLink?.url]);
  }

  private login(username: string, password: string): Subscription {
    return this.authenticationService.login(username, password).subscribe(isAuthenticated => {
        if(isAuthenticated) {
          console.log('Login successful');
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid username or password';
          console.log('Wrong credentials');
        }
    })
  }
}