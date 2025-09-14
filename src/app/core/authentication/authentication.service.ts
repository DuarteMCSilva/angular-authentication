import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly serverUrl = environment.server;

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

    return this.httpClient.get( this.serverUrl + 'auth/login',
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

  public register(username: string, password: string) {
    this.authenticationToken = btoa(username + ':' + password);

    // TODO: Actual implement register endpoint..
    return this.httpClient.post( this.serverUrl + 'auth/register',
      {username, password},
      {
        observe: 'response'
      }
    ).pipe(
      map(response => {
        return response.status === 201;
      }),
      catchError(() => {
        return of(false);
      }
    ));
  }

  public logout() {
    this.authenticationToken = null;
    this.isAuthenticated = false;
  }
}
