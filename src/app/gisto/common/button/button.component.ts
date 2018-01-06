import { Component, Input } from '@angular/core';

@Component({
  selector: 'button',
  template: `
      <icon *ngIf="icon !== ''" icon="{{ icon }}" size="{{ size }}" color="{{ color }}"></icon> <ng-content></ng-content>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() icon: string;
  @Input() color: string;
  @Input() size: string;

}
