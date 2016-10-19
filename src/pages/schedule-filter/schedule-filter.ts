import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-schedule-filter',
  template: `
  <ion-header>
    <ion-toolbar>
      <ion-buttons start>
        <button ion-button (click)="dismiss()">Cancel</button>
      </ion-buttons>

      <ion-title>
        Filter Sessions
      </ion-title>

      <ion-buttons end>
        <button ion-button (click)="applyFilters()">Done</button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content class="outer-content">

    <ion-list>
      <ion-list-header>Tracks</ion-list-header>

      <ion-item *ngFor="let track of tracks" [attr.track]="track.name | lowercase">
        <span item-left class="dot"></span>
        <ion-label>{{track.name}}</ion-label>
        <ion-toggle [(ngModel)]="track.isChecked" color="secondary"></ion-toggle>
      </ion-item>

    </ion-list>

    <ion-list>
      <button ion-item (click)="resetFilters()" detail-none class="reset-filters">
        Reset All Filters
      </button>
    </ion-list>

  </ion-content>
`
})
export class ScheduleFilterPage {
  tracks: Array<{name: string, isChecked: boolean}> = [];

  constructor(
    public confData: ConferenceData,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    // passed in array of track names that should be excluded (unchecked)
    let excludedTrackNames = this.navParams.data;

    this.confData.getTracks().then((trackNames: string[]) => {

      trackNames.forEach(trackName => {
        this.tracks.push({
          name: trackName,
          isChecked: (excludedTrackNames.indexOf(trackName) === -1)
        });
      });

    });
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.tracks.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
