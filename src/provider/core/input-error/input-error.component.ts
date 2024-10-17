import { CommonModule, KeyValue } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ErrorMessagePipe } from './error-message.pipe';
import { IonButton, IonApp, IonGrid, IonCol, IonRow, IonSpinner, IonNote, IonContent, IonBreadcrumbs, IonButtons, IonHeader, IonToolbar, IonMenu, IonMenuButton, IonTitle, IonToast, IonList, IonLabel, IonSegment, IonSegmentButton, IonItem, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonDatetime, IonAvatar, IonIcon, IonBreadcrumb, IonText, IonInput } from '@ionic/angular/standalone';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-input-error',
  // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
  template: `
  <div *ngFor="let error of this.errors | keyvalue; trackBy: trackByFn" class='input-error'>
  <!-- {{this.errorMap[error.key]?.(error.value) || error.value}} -->
  {{ error.key | nixErrorMessage: error.value}}
</div>
  `,
  // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
  styles: [`
      .input-error {
      color: red;
      font-size: 10px;
      animation: shake 0.5s; /* You can replace 'shake' with your desired animation name */
    }
    
    @keyframes shake {
      0%, 100% {
        transform: translateX(0);
      }
      10%, 30%, 50%, 70%, 90% {
        transform: translateX(-10px);
      }
      20%, 40%, 60%, 80% {
        transform: translateX(10px);
      }
    }
  `],
  standalone: true,
  imports: [CommonModule,  IonButton,IonApp,
		IonGrid,IonCol,IonRow,IonSpinner, IonNote,IonContent ,IonBreadcrumbs,IonButtons, IonHeader, IonToolbar, IonMenu, IonMenuButton, IonTitle, IonToast, IonList, IonLabel, IonSegment, IonSegmentButton, IonItem, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonDatetime, IonAvatar, IonIcon, IonBreadcrumb,
		IonText,
		IonInput, ErrorMessagePipe],
})
export class InputErrorComponent {
@Input()
errors: ValidationErrors | undefined | null = null
// protected errorMap = inject(VALIDATION_ERROR_MESSAGES)
  trackByFn(index: number, item: KeyValue<string, any>){
    return item.key
  }
}
