import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-login',
  template: `
  <ion-header>
    <ion-navbar>
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title>Login</ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content>

    <ion-list>
      <div class="logo">
        <img src="assets/img/appicon.svg">
      </div>

      <form #loginForm="ngForm" novalidate>
        <ion-item>
          <ion-label floating color="primary">Username</ion-label>
          <ion-input [(ngModel)]="login.username" name="username" type="text" #username="ngModel" spellcheck="false" autocapitalize="off" required>
          </ion-input>
        </ion-item>
        <p [hidden]="username.valid || submitted == false" color="danger" padding-left>
          Username is required
        </p>

        <ion-item>
          <ion-label floating color="primary">Password</ion-label>
          <ion-input [(ngModel)]="login.password" name="password" type="password" #password="ngModel" required>
          </ion-input>
        </ion-item>
        <p [hidden]="password.valid || submitted == false" color="danger" padding-left>
          Password is required
        </p>

        <ion-row responsive-sm>
          <ion-col>
            <button ion-button (click)="onLogin(loginForm)" type="submit" color="primary" block>Login</button>
          </ion-col>
          <ion-col>
            <button ion-button (click)="onSignup()" color="light" block>Signup</button>
          </ion-col>
        </ion-row>
      </form>
    </ion-list>

  </ion-content>
`
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData) { }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.navCtrl.push(TabsPage);
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
