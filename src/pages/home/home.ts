import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/do'
  ;
import { TrafficProvider } from '../../providers/traffic/traffic';
import { MonitorProvider } from '../../providers/monitor/monitor';
import { Subscription } from 'rxjs/Subscription';
import { UtilProvider } from '../../providers/util/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  origin = null;
  destination = null;

  trafficResult = null;

  currentDriveTime = null;
  optimalDriveTime = null;

  trafficMonitor: Subscription = null;

  driveTimes: {
    time: Date,
    duration: number
  }[] = [];

  constructor(
    public navCtrl: NavController,
    private trafficProvider: TrafficProvider,
    private monitorProvider: MonitorProvider,
    private utilProvider: UtilProvider
  ) {

  }
  detail(event) {
    console.log(event);
  }

  setOrigin(event) {
    this.origin = event;
  }
  setDestination(event) {
    this.destination = event;
  }

  get originDescription() {
    return this.origin !== null ? this.origin.description : "";
  }
  get destinationDescription() {
    return this.destination !== null ? this.destination.description : "";
  }

  get isTrafficButtonDisabled() {
    return this.origin === null || this.destination === null;
  }
  get isTrackingButtonDisabled() {
    return this.trafficMonitor === null || this.trafficMonitor.closed;
  }

  get showTrafficInfo() {
    return this.trafficResult !== null;
  }

  storeDataFromResult(result) {
    this.optimalDriveTime = this.utilProvider.getOptimalDriveTimeFromResult(result);

    this.driveTimes.push(this.utilProvider.getCurrentDriveTimeFromResult(result));
    this.trafficResult = result;
  }
  getTraffic() {
    this.trafficProvider.getInfo(this.origin.description, this.destination.description)
      .do(result => console.log(result))
      .subscribe(result => this.storeDataFromResult(result));
  }

  startTracking() {
    this.monitorProvider.startTrackingTraffic(this.origin.description, this.destination.description);
  }

  stopTracking() {
    this.monitorProvider.unsubscribeMonitor();
  }
  get showTrackingInfo() {
    return this.trafficMonitor !== null;
  }
}
