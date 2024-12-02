import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UiModule } from '@avans-nx-workshop/share-a-meal/ui';

@NgModule({
    imports: [AngularCommonModule, HttpClientModule, UiModule]
})
export class CommonModule {}
