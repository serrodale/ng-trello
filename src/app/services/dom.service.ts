import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DOMService {

    placeElement(hostElement: HTMLElement, element: HTMLElement, offSet: number, position: 'top' | 'bottom'): void {
        const { x, y, width } = hostElement.getBoundingClientRect() as DOMRect;
        const tooltipWidth: number = element.offsetWidth;
        const halfOfTooltipWidth: number = tooltipWidth / 2;
        const halfOfHostWidth: number = width / 2;

        element.style.left = `${x}px`;
        element.style.top = `${y + (position === 'top' ? -offSet : offSet)}px`;
        element.style.marginLeft = `${halfOfHostWidth - halfOfTooltipWidth}px`;
    }

}