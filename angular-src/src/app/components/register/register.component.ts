import { Component, OnInit } from '@angular/core';

// Import of the services
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

// Import of the module for the flash messages
import { FlashMessagesService } from 'angular2-flash-messages';

// Bring out the Router so we can redirect from the code
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  // Variables to use
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    // Need to inject all the services in the constructor
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    // Create the user object
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Porfavor llene todos los campos', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Porfavor ingrese un email valido', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Register user
    // Use the service with the function and the user object as is an observable
    // we need to subscribe to it and inside we have the data back
    this.authService.registerUser(user).subscribe(data => {
      // Lets validate the response and show the user the response with an alert
      if (data.success) {
        this.flashMessage.show('Registro completo, ya puede ingresar', { cssClass: 'alert-success', timeout: 3000 });
        // If the registration is success move to the login component
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('El registro no fue completado', { cssClass: 'alert-danger', timeout: 3000 });
        // If the registration is success move to the login component
        this.router.navigate(['/register']);
      }
    });

  }
}
