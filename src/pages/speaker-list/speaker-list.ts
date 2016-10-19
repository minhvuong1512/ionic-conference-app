import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
// import { InAppBrowser } from 'ionic-native';

import { ConferenceData } from '../../providers/conference-data';
import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';


@Component({
  selector: 'page-speaker-list',
  template: `
  <ion-header>
    <ion-navbar>
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title>Speakers</ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content class="outer-content speaker-list">
    <ion-card *ngFor="let speaker of speakers" class="speaker">

      <ion-card-header>
        <ion-item>
          <ion-avatar item-left>
            <img [src]="speaker.profilePic">
          </ion-avatar>
          {{speaker.name}}
          <button ion-button icon-only (click)="openContact(speaker)" clear item-right>
            <ion-icon name="help-circle"></ion-icon>
          </button>
        </ion-item>
      </ion-card-header>

      <ion-card-content class="outer-content">
        <ion-list>
          <button ion-item *ngFor="let session of speaker.sessions" (click)="goToSessionDetail(session)">
            <h3>{{session.name}}</h3>
          </button>
          <button ion-item (click)="goToSpeakerDetail(speaker)">
            <h3>About {{speaker.name}}</h3>
          </button>
        </ion-list>
      </ion-card-content>

      <ion-item>
        <button ion-button icon-left (click)="goToSpeakerTwitter(speaker)" clear item-left>
          <ion-icon name="logo-twitter"></ion-icon>
          Tweet
        </button>
        <button ion-button icon-left (click)="openSpeakerShare(speaker)" clear item-right>
          <ion-icon name="share"></ion-icon>
          Share
        </button>
      </ion-item>

    </ion-card>
  </ion-content>
`
})
export class SpeakerListPage {
  actionSheet: ActionSheet;
  speakers = [];

  constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public confData: ConferenceData, public config: Config) {
    confData.getSpeakers().then(speakers => {
      this.speakers = speakers;
    });
  }

  goToSessionDetail(session) {
    this.navCtrl.push(SessionDetailPage, session);
  }

  goToSpeakerDetail(speakerName: string) {
    this.navCtrl.push(SpeakerDetailPage, speakerName);
  }

  goToSpeakerTwitter(speaker) {
    // TODO FIX
    // let app = new InAppBrowser(`https://twitter.com/${speaker.twitter}`, '_blank');
    // app.on('loadstop').subscribe(
    //   (ev) => {
    //     console.log('InAppBrowser loaded!');
    //   });
  }

  openSpeakerShare(speaker) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
            if (window['cordova'] && window['cordova'].plugins.clipboard) {
              window['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
            }
          }
        },
        {
          text: 'Share via ...',
          handler: () => {
            console.log('Share via clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  openContact(speaker) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact with ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        }
      ]
    });

    actionSheet.present();
  }
}
