import { Component, Input, OnInit } from '@angular/core';
import { ModalsService } from '../../services/modals.service';
import { ConfirmationModal, ErrorModal, ModalType } from '../../model/modal.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() modal: (ConfirmationModal | ErrorModal);
  
  isConfirmationModal: boolean;

  constructor(
    private modalsService: ModalsService,
  ) {}

  ngOnInit(): void {
    this.isConfirmationModal = this.modal.type === ModalType.CONFIRMATION;
  }

  closeModal(): void {
    this.modalsService.deleteModal(this.modal.id);
  }

  onAccept(): void {
    (this.modal as ConfirmationModal).acceptButtonCallback();
    this.closeModal();
  }

}
