import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm-yes-no',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Confirm Action</h5>
      <button type="button" class="btn-close" aria-label="Close" (click)="close(false)"></button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to proceed?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="close(false)">No</button>
      <button type="button" class="btn btn-primary" (click)="close(true)">Yes</button>
    </div>
  `,
})
export class ModalConfirmYesNoComponent {
  constructor(public activeModal: NgbActiveModal) {}

  close(result: boolean): void {
    this.activeModal.close(result);
  }
}
