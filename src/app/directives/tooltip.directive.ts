import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { DOMService } from '../services/dom.service';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  @Input('tooltip') tooltipContent: string;

  tooltipElement: HTMLElement;
  hostElement: HTMLElement;

  private readonly offSet: number = 35;
  
  constructor(
    private elementRef: ElementRef,
    private domService: DOMService,
  ) {
    this.hostElement = elementRef.nativeElement;
  }

  @HostListener('mouseenter') show() {
    this.tooltipElement = document.createElement('span');

    this.tooltipElement.textContent = this.tooltipContent;
    this.tooltipElement.classList.add('tooltip');
    this.tooltipElement.classList.add('tooltip-top');

    document.body.appendChild(this.tooltipElement);
    
    this.domService.placeElement(this.hostElement, this.tooltipElement, this.offSet, 'top');
  }

  @HostListener('mousedown') @HostListener('mouseleave') hide() {
    if (this.tooltipElement) {
      this.tooltipElement.remove();
    }
  }
}
