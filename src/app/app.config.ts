import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideServerRendering } from '@angular/platform-server';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app.routes';
import { StorageProvider } from './storage';
import { IonicStorageModule } from '@ionic/storage-angular';
// import { IonicStorageModule, provideStorage, StorageConfig } from '@ionic/storage-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
     provideRouter(routes),
     provideIonicAngular({mode:'ios'}),
    //  provideServerRendering(),
    //  importProvidersFrom(IonicStorageModule)
    //  IonicStorageModule,
    // importProvidersFrom(IonicStorageModule.forRoot()),
    // provideStorage(PLATFORM_ID,{})
    StorageProvider,
    // {
    //   provide: Storage,
    //   useFactory: () => provideStorage(PLATFORM_ID, {} as StorageConfig),

    // },
    ]
};
