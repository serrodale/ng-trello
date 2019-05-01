import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: '<p tooltip="Test">Test</p>'
})
class TestComponent {

  constructor() {}

}

describe('TooltipDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        TooltipDirective
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create test element', () => {
    expect(component).toBeDefined();
  });

  it('should remove tooltip element', () => {
    const hostElement: HTMLElement = fixture.debugElement.nativeElement;
    const elementWithTooltip: HTMLElement = hostElement.querySelector('p');
    const mouseenterEvent: Event = new MouseEvent('mouseenter');
    const mouseleaveEvent: Event = new MouseEvent('mouseleave');
    
    elementWithTooltip.dispatchEvent(mouseenterEvent);
    fixture.detectChanges();

    elementWithTooltip.dispatchEvent(mouseleaveEvent);
    fixture.detectChanges();

    const tooltipElement: HTMLElement = document.querySelector('.tooltip');
    expect(tooltipElement).toBeFalsy();
  });

  it('should create tooltip element', () => {
    fixture.detectChanges();

    const hostElement: HTMLElement = fixture.debugElement.nativeElement;
    const elementWithTooltip: HTMLElement = hostElement.querySelector('p');
    const event: Event = new MouseEvent('mouseenter');
    
    elementWithTooltip.dispatchEvent(event);
    fixture.detectChanges();

    const tooltipElement: HTMLElement = document.querySelector('.tooltip');
    expect(tooltipElement).toBeTruthy();
  });
  
  it('should set "Test" text inside the tooltip element', () => {
    const tooltipElement: HTMLElement = document.querySelector('.tooltip');
    const tooltipContent: string = tooltipElement.textContent;
    expect(tooltipContent).toBe('Test');
  });
});