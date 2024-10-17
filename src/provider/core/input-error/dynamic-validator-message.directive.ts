import { ComponentRef, Directive, ElementRef, OnDestroy, OnInit, Renderer2, ViewContainerRef, inject } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { Subscription, filter, fromEvent, merge, skip, startWith } from 'rxjs';
import { InputErrorComponent } from './input-error.component';

@Directive({
	// selector: '[appDynamicValidatorMessage]',
	selector: '[formControlName], [formControl], [ngModel], ',
	standalone: true,

})
export class DynamicValidatorMessageDirective implements OnInit, OnDestroy {
	ngControl = inject(NgControl, {self: true})
	vcr = inject(ViewContainerRef)
	Render = inject(Renderer2)
	componentRef: ComponentRef<InputErrorComponent> | null = null
	// elementRef = inject(ElementRef);
  errorMessageTrigger: Subscription
	ngOnInit(): void {
    if (!this.ngControl.control) 
      throw Error(`NIX_ERROR-0001: No control model for ${this.ngControl.name} control.`)
		this.errorMessageTrigger = this.ngControl.control.statusChanges
		// merge(
		// 	// fromEvent(this.elementRef.nativeElement, 'blur')	
		// )
		.pipe(
			startWith(this.ngControl.control.status), //from course not needed
			skip(this.ngControl instanceof NgModel? 1: 0),
		).subscribe(isInvalid => {
      const errors = this.ngControl.control.errors
    //   const isDirty = this.ngControl.control.dirty
			if (errors /*&& isDirty */) {
				if (!this.componentRef) {
					this.componentRef = this.vcr.createComponent(InputErrorComponent);
				}
				if (isInvalid === 'INVALID') {
					this.componentRef.setInput('errors', errors)
				}
        
			} else if (this.componentRef){
        this.componentRef.destroy();
        this.componentRef = null;
      }
		})
    
	}
	ngOnDestroy(): void {
    // console.log('ngOnDestroy, this.ngControl', this.ngControl);
	this.componentRef?.destroy()
    this.errorMessageTrigger.unsubscribe()
	}

}
