import { Component } from '@angular/core';

import { PopoverController, ViewController } from 'ionic-angular';

import { test } from './test-folder';
import { taco } from '../home';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close()">Learn Ionic</button>
      <button ion-item (click)="close()">Documentation</button>
      <button ion-item (click)="close()">Showcase</button>
      <button ion-item (click)="close()">GitHub Repoo</button>
    </ion-list>
  `
})
export class PopoverPage {

  constructor(public viewCtrl: ViewController) { }

  close() {
    this.viewCtrl.dismiss();
  }
}


@Component({
  selector: 'page-about',
  template: `
  <ion-header>
    <ion-navbar>
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title>About</ion-title>
      <ion-buttons end>
        <button ion-button icon-only (click)="presentPopover($event)">
          <ion-icon name="more"></ion-icon>
        </button>
      </ion-buttons>
    </ion-navbar>
  </ion-header>

  <ion-content>
    <div class="about-header">
      <img src="assets/img/ionic-logo-white.svg">
    </div>
    <div padding class="about-info">
      <h4>Ionic Conferenceee</h4>

      <ion-list no-lines>
        <ion-item>
          <ion-icon name="calendar" item-left></ion-icon>
          <ion-label>Date</ion-label>
          <ion-datetime displayFormat="MMM DD, YYYY" [(ngModel)]="conferenceDate"></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-icon name="pin" item-left></ion-icon>
          <ion-label>Location</ion-label>
          <ion-select>
            <ion-option value="madison" selected>Madison, WI</ion-option>
            <ion-option value="austin">Austin, TX</ion-option>
            <ion-option value="chicago">Chicago, IL</ion-option>
            <ion-option value="seattle">Seattle, WA</ion-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <p>
        The Ionic Conference is a one-day conference featuring talks from the
        Ionic team. It is focused on Ionic applications being built with
        Ionic 2. This includes migrating apps from Ionic 1 to Ionic 2,
        Angular concepts, Webpack, Sass, and many other technologies used
        in Ionic 2. Tickets are completely sold out, and we’re expecting
        more than 1000 developers – making this the largest Ionic
        conference ever!
      </p>
    </div>
  </ion-content>
`
})
export class AboutPage {
  conferenceDate = '2047-05-1777777';

  constructor(public popoverCtrl: PopoverController) { }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
    console.log('yoii99adfdadffffsdf');
  }

  ionViewDidEnter() {
    test();
    taco();
  }
}
