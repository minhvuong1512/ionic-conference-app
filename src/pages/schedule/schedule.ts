import { Component, ViewChild } from '@angular/core';

import { AlertController, App, ItemSliding, List, ModalController, NavController } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
import moment from 'moment';

import { ConferenceData } from '../../providers/conference-data';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { SessionDetailPage } from '../session-detail/session-detail';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-schedule',
  template: `
  <ion-header>
    <ion-navbar no-border-bottom>
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>

      <ion-segment [(ngModel)]="segment" (ionChange)="updateSchedule()">
        <ion-segment-button value="all">
          All
        </ion-segment-button>
        <ion-segment-button value="favorites">
          Favorites
        </ion-segment-button>
      </ion-segment>

      <ion-buttons end>
        <button ion-button icon-only (click)="presentFilter()">
          <ion-icon ios="ios-options-outline" md="md-options"></ion-icon>
        </button>
      </ion-buttons>
    </ion-navbar>

    <ion-toolbar no-border-top>
      <ion-searchbar color="primary"
                    [(ngModel)]="queryText"
                    (ionInput)="updateSchedule()"
                    placeholder="Search">
      </ion-searchbar>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-list #scheduleList [hidden]="shownSessions === 0">

      <ion-item-group *ngFor="let group of groups" [hidden]="group.hide">

        <ion-item-divider sticky>
          <ion-label>
            {{group.time}}
          </ion-label>
        </ion-item-divider>

        <ion-item-sliding *ngFor="let session of group.sessions" #slidingItem [attr.track]="session.tracks[0] | lowercase" [hidden]="session.hide">

          <button ion-item (click)="goToSessionDetail(session)">
            <h3>{{session.name}}</h3>
            <p>
              {{session.timeStart}} &mdash;
              {{session.timeEnd}}:
              {{session.location}}
            </p>
          </button>

          <ion-item-options>
            <button ion-button color="favorite" (click)="addFavorite(slidingItem, session)" *ngIf="segment === 'all'">
              Favorite
            </button>
            <button ion-button color="danger" (click)="removeFavorite(slidingItem, session, 'Remove Favorite')" *ngIf="segment === 'favorites'">
              Remove
            </button>
          </ion-item-options>

        </ion-item-sliding>

      </ion-item-group>

    </ion-list>

    <ion-list-header [hidden]="shownSessions > 0">
        No Sessions Found
    </ion-list-header>


  </ion-content>
`
})
export class SchedulePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', {read: List}) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks = [];
  shownSessions: any = [];
  groups = [];
  confDate: string;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public user: UserData
  ) {

  }

  ionViewDidEnter() {
    this.app.setTitle('Schedule');
  }

  ngAfterViewInit() {
    this.updateSchedule();
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).then(data => {
      let timestamp = data.date;

      /*
        To learn how to use third party libs in an
        Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
      */
      this.confDate = moment(timestamp).format('MM/DD/YYYY');
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToSessionDetail(sessionData) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(SessionDetailPage, sessionData);
  }

  addFavorite(slidingItem: ItemSliding, sessionData) {

    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }

  }

  removeFavorite(slidingItem: ItemSliding, sessionData, title) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }
}
