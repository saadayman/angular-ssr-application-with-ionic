import { Injectable, RendererFactory2 } from '@angular/core';
import { LoadingController } from '@ionic/angular/standalone';
@Injectable({
  providedIn: 'root'
})
export class NIX_LOADING {
  private ShowLoadingController

  constructor(private _LoadingController: LoadingController,private rendererFactory: RendererFactory2) {
    this.create();
  }
  private create() {
    this._LoadingController.create({
      spinner: "lines",
      duration: 10000,
      message: 'Please wait',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    }).then(($) => {
      this.ShowLoadingController = $
    })
  }
  async present() {
    await this.ShowLoadingController?.present();
  }
  async dismiss() {
    await this.ShowLoadingController?.dismiss()?.then(() => {
      const elements = document.querySelectorAll('ion-loading');
      elements?.forEach(loading_instance=>{
        loading_instance.remove()
        loading_instance.dismiss()
      })
      this.create();
    });

  }
}