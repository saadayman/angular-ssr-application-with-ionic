import { Injectable, RendererFactory2 } from '@angular/core';
import { Renderer2 } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ScrollintoService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  scrollIntoById(Id: string) {
    try {
      const element: HTMLElement = this.renderer.selectRootElement(`#${Id}`, true)
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } catch (error) {
      console.log(`Elment with id "${Id}" is not in the view cannot and be scrolled into`)
    }

  }
}
