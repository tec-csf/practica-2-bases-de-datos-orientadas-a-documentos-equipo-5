import { Injectable } from '@angular/core';
// Bring http module and headers package
import { Http, Headers } from '@angular/http';
// Bring map operation cause we are working with observables
import { map } from 'rxjs/operators';

/* Import the JWT token from angular2-jwt
import { tokenNotExpired } from 'angular2-jwt';*/

// Import the JWT service from @auth0/angular-jwt *Angular v6+ and RxJS v6+*
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Propeties
  authToken: any;
  user: any;

  constructor(
    // Inject the http module in the constructor
    private http: Http,
    // Import the JWT service
    public jwtHelper: JwtHelperService
  ) { }

  // Function to register the user
  registerUser(user) {
    // Set a header value
    let headers = new Headers();
    // Add the content type: json | Add the value to a header
    headers.append('Content-Type', 'application/json');
    // Return an observable with the response to our server
    //                               URL of the service          data  like options send the header
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers })
      .pipe(map(res => res.json()));
    // Map the response to json
  }

  // Function to authenticate an user
  authenticateUser(user) {
    // Set a header value
    let headers = new Headers();
    // Add the content type: json | Add the value to a header
    headers.append('Content-Type', 'application/json');
    // Return an observable with the response to our server
    //                               URL of the service          data  like options send the header
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers })
      .pipe(map(res => res.json()));
    // Map the response to json
  }

  getProfile() {
    // Set a header value
    let headers = new Headers();
    // Get the value storaged in local storage
    this.loadToken();
    headers.append('Authorization', this.authToken);
    // Add the content type: json | Add the value to a header
    headers.append('Content-Type', 'application/json');
    // Return an observable with the response to our server
    //                               URL of the service          data  like options send the header
    return this.http.get('http://localhost:3000/users/profile', { headers: headers })
      .pipe(map(res => res.json()));
    // Map the response to json
  }

  // Function to store the data in the local storage
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // Save our token and user in the component
    this.authToken = token;
    this.user = user;
  }

  // Function to get the token stored in the local storage
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Function to return if the token is not expired
  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  /*------------------- Ingresos -------------------*/

  addIngreso(ingreso) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/ingresos/register', ingreso, { headers: headers })
      .pipe(map(res => res.json()));
  }

  getIngresos(userId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/ingresos/getAll', userId, { headers: headers })
      .pipe(map(res => res.json()));
  }

  getSumIngresos(userId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/ingresos/getSumIngresos', userId, { headers: headers })
      .pipe(map(res => res.json()));
  }

  /*------------------- Ingresos -------------------*/

  addEgreso(egreso) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/egresos/register', egreso, { headers: headers })
      .pipe(map(res => res.json()));
  }

  getEgresos(userId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/egresos/getAll', userId, { headers: headers })
      .pipe(map(res => res.json()));
  }

  getSumEgresos(userId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/egresos/getSumEgresos', userId, { headers: headers })
      .pipe(map(res => res.json()));
  }

}
