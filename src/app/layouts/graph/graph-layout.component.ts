import { Component, OnInit, AfterContentChecked, AfterViewChecked, AfterViewInit, OnChanges, SimpleChange } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graph-layout',
  templateUrl: './graph-layout.component.html',
  styleUrls: ['./graph-layout.component.scss']
})
export class GraphLayoutComponent implements OnInit {

  public primaryXAxis: Object;
  public primaryYAxis: Object;
  public title: string;
  public legendSettings: Object;
  public marker: Object;
  public tooltip: Object;
  public chartData: Object[];
  private programServiceSubscription: Subscription;

  constructor(
    private programService: ProgramService
  ) { }

  ngOnInit(): void {
    this.initializeGraph();
  }

  initializeGraph(): void {
    this.programServiceSubscription = this.programService.getChartData()
      .subscribe(data => {
        this.chartData = data;
      });
    this.primaryXAxis = {
      valueType: 'Category'
    };
    this.primaryYAxis = {
      labelFormat: '{value}'
    };
    this.title = 'Program Analysis';
    this.legendSettings = {
      visible: true
    };
    this.marker = {
      dataLabel: {
        visible: true
      }
    };
    this.tooltip = {
      enable: true
    };
  }

  ngOnDestroy(): void {
    if (this.programServiceSubscription)
      this.programServiceSubscription.unsubscribe();
  }

}
