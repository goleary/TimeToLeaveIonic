import { Injectable } from '@angular/core';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';

/*
  Generated class for the NotifyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotifyProvider {

  constructor(private localNotification: PhonegapLocalNotification) {
    console.log("Hello NotifyProvider Provider");
    //this.testNotification();
  }

  testNotification() {
    this.localNotification.requestPermission().then(
      (permission) => {
        if (permission === 'granted') {

          // Create the notification
          this.localNotification.create('My Title', {
            tag: 'message1',
            body: 'My body',
            icon: 'assets/icon/favicon.ico'
          });

        }
      }
    );
  }

  notifyTrafficGone(){
    this.localNotification.requestPermission().then(
      (permission) => {
        if (permission === 'granted') {

          // Create the notification
          this.localNotification.create('All of the Traffic is Gone!', {
            tag: 'message1',
            body: 'My body',
            icon: 'assets/icon/favicon.ico'
          });

        }
      }
    );
  }

}
