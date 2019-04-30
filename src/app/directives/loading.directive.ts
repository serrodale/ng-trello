import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[loading]'
})
export class LoadingDirective {

    private hostElement: HTMLElement;
    private loaderElement: HTMLElement;
    private previousPositionAttribute: string;

    constructor(elementRef: ElementRef) {
        this.hostElement = elementRef.nativeElement;
    }

    @Input() set loading(isLoading: boolean) {
        isLoading ? this.createLoader() : this.removeLoader();
    }

    createLoader(): void {
        // Por si acaso existiese antes
        this.removeLoader();

        const spinnerElement: HTMLElement = document.createElement('div');
        spinnerElement.classList.add('spinner');

        this.loaderElement = document.createElement('div');
        this.loaderElement.classList.add('loader');
        this.loaderElement.appendChild(spinnerElement);

        this.loaderElement.style.borderRadius = window.getComputedStyle(this.hostElement).borderRadius;

        this.previousPositionAttribute = this.hostElement.style.position;
        this.hostElement.style.position = 'relative';

        this.hostElement.appendChild(this.loaderElement);
    }

    removeLoader(): void {
        if (this.loaderElement) {
            this.loaderElement.remove();
            this.hostElement.style.position = this.previousPositionAttribute;
        }
    }

}
