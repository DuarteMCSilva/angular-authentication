import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  loginForm: FormGroup;
  errorMessage?: string;

  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const subscribeToForm = this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = undefined;
    });
    this.subscriptions.push(subscribeToForm);
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
          this.errorMessage = 'Invalid username or password';
          console.log('Wrong credentials');
        }
    })
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
