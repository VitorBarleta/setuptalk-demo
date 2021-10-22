import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({ selector: '[demo]' })
export class DemoDirective {

  constructor(private el: ElementRef<HTMLDivElement>) {}

  @HostListener('mouseover')
  onHover() {
      this.el.nativeElement.textContent = 'hovering';
  }

  @HostListener('mouseout')
  onLeave() {
    this.el.nativeElement.textContent = 'not hovering';
  }
}
