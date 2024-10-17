import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { NIX_STORAGE } from 'src/provider/tools/NIX_STORAGE';
import { NixGlobal } from 'src/provider/NixGlobal';
import { DetachControlService } from './detach-hanlder.service';

@Injectable({ providedIn: 'root' })
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers: { [key: string]: RootHandler } = {};

  constructor(
    public nixstorage: NIX_STORAGE,
    public nixglobal: NixGlobal,
    private detachControlService: DetachControlService
  ) {}

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (this.nixglobal.Doctor) {
      const detachKey = route.data?.detachKey;
      if (detachKey) {
        if(!this.detachControlService.getDetachValue(detachKey)){
          delete this.handlers[detachKey]
        }        
        return this.detachControlService.getDetachValue(detachKey);
      }

      return this.isDetachable(route);
    } else {
      this.handlers = {};
      return false;
    }
  }

  store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle) {
    const storeKey = this.getStoreKey(route);
    if (handler) {
      const rootHandler = {
        handle: handler,
        storeTime: new Date()
      };
      this.handlers[storeKey] = rootHandler;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const storeKey = this.getStoreKey(route);
    if (this.isAtachable(route, storeKey)) {
      return true;
    }
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const storeKey = this.getStoreKey(route);
    return this.handlers[storeKey]?.handle;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === current.routeConfig;
  }

  private getStoreKey(route: ActivatedRouteSnapshot): string {

    return route.data?.detachKey ;
  }

  private isDetachable(route: ActivatedRouteSnapshot) {
    if (route?.routeConfig?.data?.shouldDetach) {
      return true;
    }
    return false;
  }

  private isAtachable(route: ActivatedRouteSnapshot, storeKey: string) {
    if (this.isDetachable(route) && this.handlers[storeKey]?.handle) {
      return true;
    }
    return false;
  }

}

export interface RootHandler {
  handle: DetachedRouteHandle;
  storeTime: Date;
}
