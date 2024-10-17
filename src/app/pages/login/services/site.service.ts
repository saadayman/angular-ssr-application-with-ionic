import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, from, map, debounceTime, tap, throwError } from 'rxjs';
import { mergeMap, takeWhile } from "rxjs/operators";
import { environment } from '../../../../environments/environment'; 
import { NIX_STORAGE } from '../../../../provider/tools/NIX_STORAGE'; 

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(
    private _HttpClient: HttpClient,
    private _NIX_STORAGE: NIX_STORAGE,

  ) { }

  getSiteData$(){
    const url = environment.API + '/public/site'

    return from(this._NIX_STORAGE.get('website')).pipe(
      takeWhile((website) => website !== null),
      mergeMap(website => {
        const params = {url: website}
        return this._HttpClient.get<siteInfo>(url, {params}).pipe(
          mergeMap((siteData) => from((this._NIX_STORAGE.set("location", { "url": siteData.url, "db": siteData.db, "medical_version": siteData.medical_version }, false, false)) as Promise<siteInfo>)),
          map((siteData) => ({...siteData, site: website})),
          catchError(error => {
            console.log('error', error)
            return throwError(() => error)
          })
        )
      }),
      tap((res) => console.log(res))

    )
  }

  getSiteDataFromStorage$(): Observable<siteInfo>{
    return from(this._NIX_STORAGE.get('location') as Promise<siteInfo>)
  }

  getWebsiteFromStorage$(): Observable<string>{
    return from(this._NIX_STORAGE.get('website') as Promise<string>)
  }
  // -------------------------------[OK]
  setSiteData$(site: string): Observable<siteInfo>{
      const lowerCaseSite = site?.toLowerCase()
      const params = {url: lowerCaseSite}
      return this._HttpClient.get<siteInfo>(environment.API + '/public/site',{params}).pipe(
        tap(() => this._NIX_STORAGE.set('website', lowerCaseSite, false, false)),
        tap((siteInfo) => this._NIX_STORAGE.set("location", { "url": siteInfo.url, "db": siteInfo.db, "medical_version": siteInfo.medical_version }, false, false)),
        map((siteInfo) => ({...siteInfo, lowerCaseSite})),
        catchError((err) => {
          console.log('err', err)
          return throwError(() => err)
        }),
      )
  }
}

export interface siteInfo {
  site?: string,
  db : String
  medical_version : string
  url : string
  }
  