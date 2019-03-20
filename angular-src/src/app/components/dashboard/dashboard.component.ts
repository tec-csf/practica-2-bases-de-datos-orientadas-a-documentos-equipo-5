import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Object;
  userId: String;

  ingresos: any;
  egresos: any;

  sumIngresos: number;
  sumEgresos: number;
  diferenciaTotal: number;

  conceptoIngreso: String;
  montoIngreso: number;

  conceptoEgreso: String;
  montoEgreso: number;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.userId = profile.user._id;
      this.getIngresos();
      this.getEgresos();
    },
      err => {
        console.log(err);
        return false;
      });
  }

  getIngresos() {
    let user = {
      userId: this.userId
    }
    this.authService.getIngresos(user).subscribe(response => {
      if (response.success) {
        this.ingresos = response.data;
        this.getSumIngreso();
      } else {
        console.log(response.msg);
      }
    },
      err => {
        console.log(err);
        return false;
      });
  }

  getEgresos() {
    let user = {
      userId: this.userId
    }
    this.authService.getEgresos(user).subscribe(response => {
      if (response.success) {
        this.egresos = response.data;
        this.getSumEgreso();
      } else {
        console.log(response.msg);
      }
    },
      err => {
        console.log(err);
        return false;
      });
  }

  crearIngreso() {
    let myDate: any = new Date();

    if (this.montoIngreso <= 0) {
      this.flashMessage.show("Ingresa un monto correcto", {
        cssClass: 'alert-danger',
        timeout: 3000
      });
    } else {
      let newIngreso = {
        userId: this.userId,
        concepto: this.conceptoIngreso,
        cantidad: this.montoIngreso,
        fecha: myDate
      }
      this.authService.addIngreso(newIngreso).subscribe(data => {
        if (data.success) {
          this.getIngresos();
          this.flashMessage.show("Ingreso registrado exitosamente", {
            cssClass: 'alert-success',
            timeout: 2000
          });
          this.getSumIngreso();
        } else {
          this.flashMessage.show("Hubo un error al registrar el ingreso", {
            cssClass: 'alert-danger',
            timeout: 2000
          });
        }
      });
      this.conceptoIngreso = null;
      this.montoIngreso = null;
    }
  }

  crearEgreso() {
    let myDate: any = new Date();

    if (this.montoEgreso <= 0) {
      this.flashMessage.show("Ingresa un monto correcto", {
        cssClass: 'alert-danger',
        timeout: 3000
      });
    } else {
      let newEgreso = {
        userId: this.userId,
        concepto: this.conceptoEgreso,
        cantidad: this.montoEgreso,
        fecha: myDate
      }
      console.log(newEgreso);
      this.authService.addEgreso(newEgreso).subscribe(data => {
        if (data.success) {
          this.getEgresos();
          this.flashMessage.show("Egreso registrado exitosamente", {
            cssClass: 'alert-success',
            timeout: 2000
          });
          this.getSumEgreso();
        } else {
          this.flashMessage.show("Hubo un error al registrar el egreso", {
            cssClass: 'alert-danger',
            timeout: 2000
          });
        }
      });
      this.conceptoEgreso = null;
      this.montoEgreso = null;
    }
  }

  getSumIngreso() {
    let user = {
      userId: this.userId
    }
    this.authService.getSumIngresos(user).subscribe(response => {
      if (response.success) {
        this.sumIngresos = response.data[0].totalIngresos;
      } else {
        this.flashMessage.show(response.data.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
      }
    });
  }

  getSumEgreso() {
    let user = {
      userId: this.userId
    }
    this.authService.getSumEgresos(user).subscribe(response => {
      if (response.success) {
        this.sumEgresos = response.data[0].totalEgresos;
      } else {
        this.flashMessage.show(response.data.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
      }
    });
  }

  makePositive(number) {
    return Math.abs(number);
  }

}
