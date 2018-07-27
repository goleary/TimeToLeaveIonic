import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  THRESHOLD: number = 0.2;

  constructor(
    public http: HttpClient,
    private notifyService: NotifyProvider,
    private trafficService: TrafficProvider,
    private utilService: UtilProvider
  ) {
    console.log('Hello MonitorProvider Provider');
  }

  startTrackingTraffic(origin, destination) {
    return Observable.interval(1 * 15 * 1000)
      .flatMap(() => this.trafficService.getInfo(origin, destination))
      .do(result => this.serveNotificationIfTrafficGone(result));
  }

  checkIfTrafficBelowThreshold(trafficData) {
    let result = (this.utilService.getCurrentDriveTimeFromResult(trafficData).value / this.utilService.getOptimalDriveTimeFromResult(trafficData).value - 1) < this.THRESHOLD;
    console.log('checkIfTrafficBelowThreshold result: ', result);
    return result;
  }

  serveNotificationIfTrafficGone(result) {
    if (this.checkIfTrafficBelowThreshold(result)) {
      this.notifyService.notifyTrafficGone();
    }
  }

}
