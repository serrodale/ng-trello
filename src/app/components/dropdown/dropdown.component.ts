import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DropdownOption } from '../../model/dropdown-option.model';
import { DOMService } from '../../services/dom.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @ViewChild('dropdownRef') dropdownRef: ElementRef;

  @Input() options: DropdownOption[] = [];
  @Input() parentElement: HTMLElement;
  
  isVisible: boolean;

  constructor(
    private domService: DOMService,
  ) {}

  // Para que no pueda haber dos abiertos
  @HostListener('document:click', ['$event']) onDocumentClick(clickEvent: MouseEvent) {
    this.isVisible = this.isVisible !== undefined && this.parentElement === clickEvent.srcElement;
  }

  ngOnInit() {
    // Para que esté completamente renderizado el componente
    setTimeout(() => {
      this.domService.placeElement(this.parentElement, this.dropdownRef.nativeElement, 27, 'bottom');
      this.isVisible = true;
    });
  }

  onOptionClick(option: DropdownOption): void {
    option.callback();
    this.isVisible = false;
  }

}
