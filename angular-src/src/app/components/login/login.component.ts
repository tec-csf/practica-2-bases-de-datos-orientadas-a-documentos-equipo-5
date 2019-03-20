import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    // Create the user person
    const user = {
      username: this.username,
      password: this.password
    }

    // Create the petition to authenticate the user and get all the data from the database
    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        // If the login is success we are going to store the data into the local storage
        this.authService.storeUserData(data.token, data.user)
        // Show message as logged in
        this.flashMessage.show("Bienvenido " + data.user.name, {
          cssClass: 'alert-success',
          timeout: 5000
        });
        this.router.navigate(['/dashboard']);
      } else {
        // Show message as cant log in
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        });
        this.router.navigate(['/login']);
      }
    });
  }

}
