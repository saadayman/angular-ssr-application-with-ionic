import { InjectionToken, Provider } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const STORAGE = new InjectionToken<Storage>('IonicStorage');

export function provideStorage(platformId: Object):Storage {
  if (isPlatformBrowser(platformId)) {
    const storage = new Storage();
    storage.create(); 
    return storage;
  }
  
  return {
    get: async () => null,
    set: async () => undefined,
    remove: async () => undefined,
    clear: async () => undefined,
  } as unknown as Storage;
}

export const StorageProvider: Provider = {
  provide: STORAGE,
  useFactory: provideStorage,
  deps: [PLATFORM_ID],
};
