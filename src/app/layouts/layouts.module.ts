import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProgramComponent } from './card-program/card-program.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [CardProgramComponent, LoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CardProgramComponent,
    LoaderComponent
  ]
})
export class LayoutsModule { }
