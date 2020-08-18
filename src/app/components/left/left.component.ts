import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {

  @ViewChildren('btn') btn: QueryList<ElementRef>;

  // Static initialization of years
  years: number[] = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,];
  private currentYearIndex: number = -1;

  constructor(
    private programService: ProgramService
  ) { }

  ngOnInit(): void { }

  activateButton(btn: ElementRef, i: number) {
    btn.nativeElement.style.background = "#7aba04";   // Activage Button
  }
  deActivateButton(btn: ElementRef, i: number) {
    btn.nativeElement.style.background = "#c5e09b";   // Deactivate Button
  }

  query(year: string, i) {
    let j = 0;
    if(this.currentYearIndex == i) {
      this.currentYearIndex = -1;
    }
    else {
      this.currentYearIndex = i;
    }
    this.btn.forEach(m => {
      if(this.currentYearIndex == -1){
        this.deActivateButton(m, j)
      }
      else {
        if (i == j) {
          this.activateButton(m, j)
        }
        else {
          this.deActivateButton(m, j)
        }
      }
      j++;
    })
    this.programService.getAPIResponse(`&launch_year=${year}`);
  }

}
