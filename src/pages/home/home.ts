import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrafficProvider } from '../../providers/traffic/traffic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  from = null;
  destination = null;
  constructor(
    public navCtrl: NavController,
    private trafficProvider: TrafficProvider
  ) {

  }
  detail(event) {
    console.log(event);
  }

  setFrom(event) {
    this.from = event;
  }
  setDestination(event) {
    this.destination = event;
  }

  get fromDescription() {
    return this.from !== null ? this.from.description : "";
  }
  get destinationDescription() {
    return this.destination !== null ? this.destination.description : "";
  }

  isButtonDisabled() {
    return this.from === null || this.destination === null;
  }

  getTraffic() {
    this.trafficProvider.getInfo(this.from.description, this.destination.description)
      .subscribe(result => console.log(result));
  }
}
