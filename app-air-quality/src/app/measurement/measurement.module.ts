import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasurementComponent } from './measurement.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {path : '', component : MeasurementComponent}
];

@NgModule({
  declarations: [MeasurementComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MeasurementModule { }
