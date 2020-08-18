import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProgramComponent } from './card-program/card-program.component';



@NgModule({
  declarations: [CardProgramComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CardProgramComponent
  ]
})
export class LayoutsModule { }
