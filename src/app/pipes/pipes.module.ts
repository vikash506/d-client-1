import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoolToStrPipe } from './bool-to-str.pipe';



@NgModule({
  declarations: [
    BoolToStrPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BoolToStrPipe
  ]
})
export class PipesModule { }
