import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { SuccessAlert } from '../../model/alert.model';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlertComponent,
      ]
    });

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('should create test element', () => {
    expect(component).toBeDefined();
  });

  it('should hide alert on click', () => {
    component.alert = new SuccessAlert('Test');

    const hideSpy: jasmine.Spy = spyOn(component, 'hide');
    const hostElement: HTMLElement = fixture.nativeElement;
    const alertElement: HTMLElement = hostElement.querySelector('p');
    
    alertElement.click();
    fixture.detectChanges();

    expect(hideSpy).toHaveBeenCalledTimes(1);
  });

  it('should show check icon when its a SuccessAlert', () => {
    component.alert = new SuccessAlert('Test');
    fixture.detectChanges();

    const hostElement: HTMLElement = fixture.nativeElement;
    const iconElement: HTMLElement = hostElement.querySelector('i.fa-check');

    expect(iconElement).toBeTruthy();
  });

  it('should has "success" class when its a SuccessAlert', () => {
    component.alert = new SuccessAlert('Test');
    fixture.detectChanges();

    const hostElement: HTMLElement = fixture.nativeElement;
    const alertElement: HTMLElement = hostElement.querySelector('p');
    const classList: DOMTokenList = alertElement.classList;

    expect(classList.contains('success')).toBe(true);
  });
  
  it('should auto hide after "autoHideDelay"ms', async(() => {
    component.alert = new SuccessAlert('Test', true);
    fixture.detectChanges();

    const hideSpy: jasmine.Spy = spyOn(component, 'hide');

    setTimeout(() => expect(hideSpy).toHaveBeenCalledTimes(1), component.autoHideDelay);
  }));
});