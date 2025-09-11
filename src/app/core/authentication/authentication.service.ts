import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authToken: string | null = null;

  constructor(private httpClient: HttpClient) { }

  get authenticationToken(): string | null {
    return this.authToken;
  }

  set authenticationToken(token: string | null) {
    this.authToken = token;
  }

  public getAuthenticationHeader() {
    return 'Basic ' + this.authenticationToken;
  }

  public login(username: string, password: string) {
    this.authenticationToken = btoa(username + ':' + password);

    return this.httpClient.get('http://localhost:8080/api/login', { headers: { Authorization: this.getAuthenticationHeader() }, responseType: 'text' });
  }

}
