import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TrafficProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TrafficProvider {
  baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&"//origins=the%20shops%20at%20bravern&destinations=6718%2021st%20Ave%20NW,%20Seattle,%20WA%2098117&departure_time=now&key=AIzaSyAGMbMlG34NX1WuXa1PvuPe8HBplBQhfd4
  apiKey = "AIzaSyAGMbMlG34NX1WuXa1PvuPe8HBplBQhfd4";
  constructor(public http: HttpClient) {
    console.log('Hello TrafficProvider Provider');
  }

  getInfo(origin, destination) {
    return this.http.get(this.generateRequest(origin, destination));
  }

  generateRequest(origin, destination) {
    return this.baseUrl +
      `&origins=${origin}&destinations= ${destination}&departure_time=now&key=${this.apiKey}`;
  }

}
