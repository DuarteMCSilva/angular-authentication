import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authToken: string | null = null;
  private _isAuthenticated = false;

  constructor(private httpClient: HttpClient) { }

  get authenticationToken(): string | null {
    return this.authToken;
  }

  set authenticationToken(token: string | null) {
    this.authToken = token;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  private set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  public getAuthenticationHeader() {
    return 'Basic ' + this.authenticationToken;
  }

  public login(username: string, password: string) {
    this.authenticationToken = btoa(username + ':' + password);

    return this.httpClient.get(
      'http://localhost:8080/api/login',
      { 
        observe: 'response',
        headers: { Authorization: this.getAuthenticationHeader() } 
      }
    ).pipe(
      map(response => {
        this.isAuthenticated = response.status === 202
        return this.isAuthenticated;
      }),
      catchError(() => {
        this.isAuthenticated = false;
        return of(false);
      }
    ));
  }

}
