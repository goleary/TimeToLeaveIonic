import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TrafficProvider } from '../traffic/traffic';
import { UtilProvider } from '../util/util';
import { NotifyProvider } from '../notify/notify';

/*
  Generated class for the MonitorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MonitorProvider {

  THRESHOLD: number = 1;

  monitorSubscription: Subscription;

  constructor(
    public http: HttpClient,
    private notifyService: NotifyProvider,
    private trafficService: TrafficProvider,
    private utilService: UtilProvider
  ) {
    console.log('Hello MonitorProvider Provider');
  }

  startTrackingTraffic(origin, destination) {
    this.monitorSubscription = Observable.interval(1 * 15 * 1000)
      .flatMap(() => this.trafficService.getInfo(origin, destination))
      .subscribe(result => this.serveNotificationIfTrafficGone(result));
    return this.monitorSubscription;
  }

  checkIfTrafficBelowThreshold(trafficData) {
    let result = (this.utilService.getCurrentDriveTimeFromResult(trafficData).value / this.utilService.getOptimalDriveTimeFromResult(trafficData).value - 1) < this.THRESHOLD;
    console.log('checkIfTrafficBelowThreshold result: ', result);
    return result;
  }

  serveNotificationIfTrafficGone(result) {
    if (this.checkIfTrafficBelowThreshold(result)) {
      this.unsubscribeMonitor();
      this.notifyService.notifyTrafficGone();
    }
  }
  unsubscribeMonitor() {
    console.log('unsubscribeMonitor');
    this.monitorSubscription.unsubscribe();
  }

}
