import { TestBed, async } from '@angular/core/testing';
import { AlertsService } from './alerts.service';
import { SuccessAlert, Alert } from '../model/alert.model';

describe('AlertsService', () => {

    let alertsService: AlertsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        alertsService = TestBed.get(AlertsService);
    });

    it('should be created', () => {
        expect(alertsService).toBeTruthy();
    });

    it('should assign ids secuentially', () => {
        const alertA: SuccessAlert = new SuccessAlert('A');
        alertsService.addSuccessAlert(alertA);
        expect(alertA.id).toBe(1);

        const alertB: SuccessAlert = new SuccessAlert('B');
        alertsService.addSuccessAlert(alertB);
        expect(alertB.id).toBe(2);
    });

    it('should emit on observable after adding', async(() => {
        const alertsService: AlertsService = TestBed.get(AlertsService);

        alertsService.alerts$.subscribe((alerts: Alert[]) => {
            expect(alerts.length).toBe(1);        
        });

        const alertA: SuccessAlert = new SuccessAlert('A');
        alertsService.addSuccessAlert(alertA);
    }));

    it('should emit on observable after deleting', async(() => {
        const alertA: SuccessAlert = new SuccessAlert('A');
        alertsService.addSuccessAlert(alertA);

        alertsService.alerts$.subscribe((alerts: Alert[]) => {
            expect(alerts.length).toBe(0);        
        });

        alertsService.deleteAlert(alertA.id);
    }));
});
