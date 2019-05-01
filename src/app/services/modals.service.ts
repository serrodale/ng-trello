import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Modal, ConfirmationModal } from '../model/modal.model';

@Injectable({
    providedIn: 'root'
})
export class ModalsService {

    private modalId: number = 1;
    private modals: Modal[] = [];
    private modalsSubject: Subject<Modal[]> = new Subject();

    modals$: Observable<Modal[]> = this.modalsSubject.asObservable();

    addConfirmationModal(modal: ConfirmationModal): void {
        // Asignamos al modal un nuevo id para saber cuál
        modal.id = this.modalId++;

        this.modals.push(modal);
        this.modalsSubject.next(this.modals);
    }

    deleteModal(id: number): void {
        this.modals = this.modals.filter((modal: Modal) => modal.id !== id);
        this.modalsSubject.next(this.modals);
    }

}