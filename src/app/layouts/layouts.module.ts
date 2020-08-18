import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProgramComponent } from './card-program/card-program.component';
import { LoaderComponent } from './loader/loader.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [CardProgramComponent, LoaderComponent],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    CardProgramComponent,
    LoaderComponent
  ]
})
export class LayoutsModule { }
