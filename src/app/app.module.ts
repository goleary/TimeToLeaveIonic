import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Button } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { GooglePlacesAutocompleteComponentModule } from 'ionic2-google-places-autocomplete';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TrafficProvider } from '../providers/traffic/traffic';
import { HttpClientModule } from '@angular/common/http';
import { MonitorProvider } from '../providers/monitor/monitor';
import { NotifyProvider } from '../providers/notify/notify';
import { UtilProvider } from '../providers/util/util';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    GooglePlacesAutocompleteComponentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TrafficProvider,
    MonitorProvider,
    NotifyProvider,
    PhonegapLocalNotification,
    UtilProvider
  ]
})
export class AppModule { }
