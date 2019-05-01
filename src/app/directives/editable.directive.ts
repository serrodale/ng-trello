import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[editable]'
})
export class EditableDirective {

  @Input('editable') callback: Function;
  
  private originalValue: string;
  private hostElement: HTMLElement;

  constructor(elementRef: ElementRef) {
    this.hostElement = elementRef.nativeElement;
    this.hostElement.contentEditable = 'true';
    this.hostElement.spellcheck = false;

    // Para que, si se queda vacío, después se pueda volver a editar
    this.hostElement.style.minWidth = '5px';
  }

  // Porque no siempre que se hace click fuera de la tarea teniendo el foco se emite el evento blur
  @HostListener('document:click', ['$event']) onClick(clickEvent: MouseEvent): void {
    const srcElement: Element = clickEvent.srcElement;

    if (this.hostElement !== srcElement) {
      (this.hostElement as HTMLInputElement).blur();
    }
  }

  @HostListener('focus') setOriginalValue(): void {
    this.originalValue = this.hostElement.textContent;
  }

  @HostListener('blur') saveChanges(): void {
    const currentValue: string = this.hostElement.textContent;

    if (this.originalValue !== currentValue) {
      this.callback(currentValue);
    }
  }

}
