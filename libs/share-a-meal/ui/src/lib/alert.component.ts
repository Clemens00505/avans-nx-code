import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertService } from './alert.service';
import { AlertType } from './alert-type.enum';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  alert$: Observable<{ type: AlertType; message: string } | null>;

  constructor(private alertService: AlertService) {
    this.alert$ = this.alertService.alert$;
  }

  ngOnInit(): void {}
}
