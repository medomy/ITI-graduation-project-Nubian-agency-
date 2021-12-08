import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastsService } from '../../services/toasts.service';

@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: { '[class.ngb-toasts]': 'true' },
})
export class ToastsComponent implements OnInit {
  constructor(public toastService: ToastsService) {}
  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
  ngOnInit(): void {}
}
