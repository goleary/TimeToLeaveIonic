import { Injectable } from '@angular/core';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {

  constructor() {
    console.log('Hello UtilProvider Provider');
  }

  getOptimalDriveTimeFromResult(result) {
    return this.getRouteInfoFromResult(result).duration;
  }
  getCurrentDriveTimeFromResult(result) {
    return this.getRouteInfoFromResult(result).duration_in_traffic;
  }

  private getRouteInfoFromResult(result) {
    return result.rows[0].elements[0];
  }

}
