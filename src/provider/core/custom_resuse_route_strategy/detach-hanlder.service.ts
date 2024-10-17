import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DetachControlService {
  private detachValues: { [key: string]: boolean } = {};

  setDetachValue(key: string, value: boolean) {
    this.detachValues[key] = value;
  }

  getDetachValue(key: string): boolean {
    return this.detachValues[key];
  }
}
