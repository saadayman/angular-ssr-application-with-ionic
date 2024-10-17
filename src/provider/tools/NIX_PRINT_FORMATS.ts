import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PrintFormats {
    formats = {
        VAT_INVOICE:'VAT Invoice',
        Pharmacy_VAT_Invoice:'Pharmacy VAT Invoice'
    }
}