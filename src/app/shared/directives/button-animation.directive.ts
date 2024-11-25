import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[mat-button], [mat-raised-button], [mat-stroked-button], [mat-flat-button], [mat-icon-button], [mat-fab], [mat-mini-fab]',
  standalone: true
})
export class ButtonAnimationDirective {
  @HostBinding('@.disabled')
  public animationsDisabled = false;

  @HostBinding('style.transition')
  get transition() {
    return 'all 0.2s ease-in-out';
  }

  @HostBinding('@buttonAnimation') state = 'idle';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.state = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.state = 'idle';
  }

  @HostListener('mousedown')
  onMouseDown() {
    this.state = 'active';
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.state = 'hover';
  }
} 