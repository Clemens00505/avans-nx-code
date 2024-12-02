import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-leave-yes-no',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Unsaved Changes</h5>
      <button type="button" class="btn-close" aria-label="Close" (click)="close(false)"></button>
    </div>
    <div class="modal-body">
      <p>You have unsaved changes. Are you sure you want to leave this page?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="close(false)">Stay</button>
      <button type="button" class="btn btn-primary" (click)="close(true)">Leave</button>
    </div>
  `,
})
export class ModalLeaveYesNoComponent {
  constructor(public activeModal: NgbActiveModal) {}

  close(result: boolean): void {
    this.activeModal.close(result);
  }
}
