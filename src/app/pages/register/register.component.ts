import { Component } from '@angular/core';
import { SimpleFormComponent } from '../../shared/components/simple-form/simple-form.component';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [SimpleFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  readonly FORM_CONFIG = {
    formTitle: 'Register',
    formFields: [
      { label: 'Username', type: 'text', name: 'username', required: true },
      { label: 'Password', type: 'password', name: 'password', required: true }
    ],
    formSubmitText: 'Sign Up',
    footerLink: { text: "Already have an account? Sign Up", url: '/login' }
  }

  errorMessage?: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  onSubmit(loginForm: FormGroup) {
    if (loginForm.valid) {
      const { username, password } = loginForm.value;
      console.log('Username:', username);
      console.log('Password:', password);
      this.register(username, password);
    }
  }

  private register(username: string, password: string): Subscription {
      return this.authenticationService.register(username, password).subscribe(isAuthenticated => {
          if(isAuthenticated) {
            console.log('Registered!');
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Username already exists...';
          }
      })
    }

}
