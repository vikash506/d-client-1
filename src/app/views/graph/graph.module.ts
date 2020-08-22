import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph.component';
import { GraphRoutingModule } from './graph-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [GraphComponent],
  imports: [
    CommonModule,
    GraphRoutingModule,
    SharedModule
  ]
})
export class GraphModule { }
