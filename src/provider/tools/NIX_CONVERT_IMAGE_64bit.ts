import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class NIX_CONVERT_IMAGE_64bit {
  constructor() { }
  convert(image_64bit) {
    let canvas = document.createElement('canvas');
    const IMAGE: any = document.getElementById(image_64bit);
    canvas.height = IMAGE.naturalHeight;
    canvas.width = IMAGE.naturalWidth;
    let ctx = canvas.getContext('2d')
    ctx.drawImage(IMAGE, 0, 0, canvas.width, canvas.height);
    var base_64bit_string = canvas.toDataURL();
    return base_64bit_string
  };
}