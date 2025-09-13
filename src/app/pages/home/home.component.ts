import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {
  }

  onLogout() { 
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
