import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  private getAuthenticateURL:string = 'api/auth';

  constructor(private http:Http) { }

  login(username:string, password:string) {
    console.log('login service');
    return this.http.post(this.getAuthenticateURL, JSON.stringify({ username: username, password: password}))
      .map(response => {
        let user = response.json();
        console.log('mapping user found',user);
        if(user) {
          console.log('user found!');
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
        
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
