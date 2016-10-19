import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SessionDetailPage } from '../session-detail/session-detail';


@Component({
  selector: 'page-speaker-detail',
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>{{speaker.name}}</ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content padding class="speaker-detail">

    <div text-center>
      <img [src]="speaker.profilePic" [alt]="speaker.name"><br>

      <button ion-button icon-only clear small color="twitter">
        <ion-icon name="logo-twitter"></ion-icon>
      </button>
      <button ion-button icon-only clear small color="github">
        <ion-icon name="logo-github"></ion-icon>
      </button>
      <button ion-button icon-only clear small color="instagram">
        <ion-icon name="logo-instagram"></ion-icon>
      </button>
    </div>

    <p>{{speaker.about}}</p>

  </ion-content>
  `
})
export class SpeakerDetailPage {
  speaker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.speaker = this.navParams.data;
  }

  goToSessionDetail(session) {
    this.navCtrl.push(SessionDetailPage, session);
  }
}
