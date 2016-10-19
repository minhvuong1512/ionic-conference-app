import { PopoverController, ViewController } from 'ionic-angular';
export declare class PopoverPage {
    viewCtrl: ViewController;
    constructor(viewCtrl: ViewController);
    close(): void;
}
export declare class AboutPage {
    popoverCtrl: PopoverController;
    conferenceDate: string;
    constructor(popoverCtrl: PopoverController);
    presentPopover(event: any): void;
    ionViewDidEnter(): void;
}
