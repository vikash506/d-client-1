import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProgramComponent } from './card-program/card-program.component';
import { LoaderComponent } from './loader/loader.component';
import { PipesModule } from '../pipes/pipes.module';
import { MatCardModule } from '@angular/material/card';
import { GraphLayoutComponent } from './graph/graph-layout.component';
import {
  ChartModule,
  LineSeriesService,
  AreaSeriesService,
  CategoryService,
  LegendService,
  TooltipService,
  DataLabelService,
  SplineAreaSeriesService
} from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [CardProgramComponent, LoaderComponent, GraphLayoutComponent],
  imports: [
    CommonModule,
    PipesModule,
    MatCardModule,
    ChartModule
  ],
  exports: [
    CardProgramComponent,
    LoaderComponent,
    GraphLayoutComponent,
    ChartModule
  ],
  providers: [
    CategoryService,
    LegendService,
    TooltipService,
    DataLabelService,
    LineSeriesService,
    AreaSeriesService,
    SplineAreaSeriesService
  ]
})
export class LayoutsModule { }
