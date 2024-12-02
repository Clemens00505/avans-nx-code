import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertType } from './alert-type.enum'; // Import the AlertType enum

interface Alert {
  type: AlertType;
  message: string;
  visible?: boolean;
  error?: string;  // Optional error property for more detailed error messages
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);
  alert$ = this.alertSubject.asObservable();

  constructor() {}

  showAlert(options: { 
    type: AlertType; 
    message: string; 
    visible?: boolean; 
    error?: string; // Make the error property optional here as well
  }): void {
    // Set default visible to true if not provided
    this.alertSubject.next({
      ...options,
      visible: options.visible ?? true,  // If 'visible' is not provided, default to true
    });

    // Optionally, clear the alert after a few seconds
    setTimeout(() => {
      this.clearAlert();
    }, 5000);
  }

  clearAlert(): void {
    this.alertSubject.next(null);
  }
}
