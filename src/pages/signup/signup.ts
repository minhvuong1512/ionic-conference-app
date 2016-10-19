import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-signup',
  template: `
  <ion-header>
    <ion-navbar>
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title>Signup</ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content class="login-page">

    <ion-list>
      <div class="logo">
        <img src="assets/img/appicon.svg">
      </div>

      <form #signupForm="ngForm" novalidate>
        <ion-item>
          <ion-label floating color="primary">Username</ion-label>
          <ion-input [(ngModel)]="signup.username" name="username" type="text" #username="ngModel" required>
          </ion-input>
        </ion-item>
        <p [hidden]="username.valid || submitted == false" color="danger" padding-left>
          Username is required
        </p>

        <ion-item>
          <ion-label floating color="primary">Password</ion-label>
          <ion-input [(ngModel)]="signup.password" name="password" type="password" #password="ngModel" required>
          </ion-input>
        </ion-item>
        <p [hidden]="password.valid || submitted == false" color="danger" padding-left>
          Password is required
        </p>

        <div padding>
          <button ion-button (click)="onSignup(signupForm)" type="submit" block color="primary">Create</button>
        </div>
      </form>
    </ion-list>

  </ion-content>
`
})
export class SignupPage {
  signup: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData) {}

  onSignup(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup.username);
      this.navCtrl.push(TabsPage);
    }
  }
}
