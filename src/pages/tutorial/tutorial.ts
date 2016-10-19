import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';


export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  template: `
  <ion-header no-shadow>
    <ion-navbar>
      <ion-buttons end *ngIf="showSkip">
        <button ion-button (click)="startApp()" color="primary">Skip</button>
      </ion-buttons>
    </ion-navbar>
  </ion-header>

  <ion-content no-bounce>
    <ion-slides [options]="{pager: true}" (ionWillChange)="onSlideChangeStart($event)">
      <ion-slide *ngFor="let slide of slides">
        <img [src]="slide.image" class="slide-image"/>
        <h2 class="slide-title" [innerHTML]="slide.title"></h2>
        <p [innerHTML]="slide.description"></p>
      </ion-slide>
      <ion-slide>
        <img src="assets/img/ica-slidebox-img-4.png" class="slide-image"/>
        <h2 class="slide-title">Ready to Play?</h2>
        <button ion-button icon-right large clear (click)="startApp()">
          Continue
          <ion-icon name="arrow-forward"></ion-icon>
        </button>
      </ion-slide>
    </ion-slides>
  </ion-content>
`
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController) {
    this.slides = [
      {
        title: 'Welcome to <b>ICA</b>',
        description: 'The <b>Ionic Conference App</b> is a practical preview of the Ionic Framework in action, and a demonstration of proper code use.',
        image: 'assets/img/ica-slidebox-img-1.png',
      },
      {
        title: 'What is Ionic?',
        description: '<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.',
        image: 'assets/img/ica-slidebox-img-2.png',
      },
      {
        title: 'What is Ionic Platform?',
        description: 'The <b>Ionic Platform</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.',
        image: 'assets/img/ica-slidebox-img-3.png',
      }
    ];
  }

  startApp() {
    this.navCtrl.push(TabsPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
