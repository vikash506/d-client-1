import { Component, OnInit } from '@angular/core';
import { ProgramService } from '@services/program.service';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {

  // For dynamic fetching of years from ProgramService
  // years: string[];

  // Static initialization of years
  years: number[] = [ 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, ];

  constructor(
    // For dynamic fetching of years from ProgramService
    // private programService: ProgramService
  ) { }

  ngOnInit(): void {
    // For dynamic fetching of years
    // this.programService.getProgramsWithoutFilter()
    // .subscribe(res => {
    //   this.years = Array.from(new Set(res.map(m => m.launch_year)));
    // });
  }

}
