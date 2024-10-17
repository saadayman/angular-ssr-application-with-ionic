import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { Currency_Precision } from '../Precision/Currency_Precision';

@Directive({
	selector: '[currencyMask]',
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: CurrencyMaskDirective,
			multi: true
		}
	],
})
export class CurrencyMaskDirective implements OnInit, OnChanges, ControlValueAccessor {
  @Input() value: any;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (newValue: any) => void = () => {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {}

  constructor(
    private _Currency_Precision: Currency_Precision,
    private el: ElementRef,
    private _Renderer2: Renderer2,
  ) { }
  
  // in case of directive applied for non formControl
  ngOnChanges(changes: SimpleChanges): void {
  	if ('value' in changes) {    
  		this.writeValue(changes.value.currentValue ?? 0);
  	}
  }

  ngOnInit(): void {
  	fromEvent<Event>(this.el.nativeElement, 'blur')
  		.subscribe((c: Event) => {
  			const value = (c.target as HTMLIonInputElement).value;
			
  			this.setValue(value)
  			this.onTouched()
  		});
  }

  setValue(value: number | string | any){	

  	if (value || value === 0) {
  		const floatNumber = Number(value).toFixed(this._Currency_Precision.currency_precision);
  		this._Renderer2.setProperty(this.el.nativeElement, 'value', floatNumber);
  		this.onChange(parseFloat(floatNumber));
  	} else {
		this._Renderer2.setProperty(this.el.nativeElement, 'value', null);
  		this.onChange(null);
  	}
  }

  // values come from the formModel
  writeValue(obj: any): void {
	
  	if (isNaN(parseFloat(obj))) {
  		console.warn('Accept only number type');
		this.setValue(null);
  		return
  		// this.setValue(0)
  	}
  	// add validations [accept numbers]
  	this.setValue(obj)
  }

  registerOnChange(fn: any): void {
  	this.onChange = fn
  }

  registerOnTouched(fn: any): void {
  	this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {    
  	this._Renderer2.setProperty(this.el.nativeElement, 'disabled', isDisabled);
  }


}
