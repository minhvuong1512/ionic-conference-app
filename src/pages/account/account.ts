import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-account',
  template: `
  <ion-header>
    <ion-navbar>
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title>Account</ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content class="outer-content">
    <div padding-top text-center *ngIf="username">
      <img src="http://www.gravatar.com/avatar?d=mm&s=140">
      <h2>{{username}}</h2>

      <ion-list inset>
        <button ion-item (click)="updatePicture()">Update Picture</button>
        <button ion-item (click)="changeUsername()">Change Username</button>
        <button ion-item (click)="changePassword()">Change Password</button>
        <button ion-item (click)="logout()">Logout</button>
      </ion-list>
    </div>
  </ion-content>
`
})
export class AccountPage {
  username: string;

  constructor(public alertCtrl: AlertController, public nav: NavController, public userData: UserData) {

  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot(LoginPage);
  }
}
