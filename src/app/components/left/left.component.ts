import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {

  @ViewChildren('btnYear') btn: QueryList<ElementRef>;
  @ViewChild('launchTrue') launchTrue: ElementRef;
  @ViewChild('launchFalse') launchFalse: ElementRef;
  @ViewChild('landTrue') landTrue: ElementRef;
  @ViewChild('landFalse') landFalse: ElementRef;

  // Static initialization of years
  years: number[] = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,];
  private currentYearIndex: number = -1;
  private currentLaunched: boolean = null;
  private currentLanded: boolean = null;

  constructor(
    private programService: ProgramService
  ) { }

  ngOnInit(): void { }

  activateButton(btn: ElementRef) {
    btn.nativeElement.style.background = "#7aba04";   // Activage Button
  }
  deActivateButton(btn: ElementRef) {
    btn.nativeElement.style.background = "#c5e09b";   // Deactivate Button
  }

  queryYear(year: string, i) {
    let j = 0;
    if (this.currentYearIndex == i) {
      this.currentYearIndex = -1;
    }
    else {
      this.currentYearIndex = i;
    }
    this.btn.forEach(m => {
      if (this.currentYearIndex == -1) {
        this.deActivateButton(m)
      }
      else {
        if (i == j) {
          this.activateButton(m)
        }
        else {
          this.deActivateButton(m)
        }
      }
      j++;
    })
    this.programService.getAPIResponse('launch_year', year);
  }

  queryLaunch(launched: boolean) {
    if (this.currentLaunched == null) {
      if (launched == true) {
        this.activateButton(this.launchTrue)
        this.deActivateButton(this.launchFalse)
        this.currentLaunched = true;
      }
      else {
        this.activateButton(this.launchFalse)
        this.deActivateButton(this.launchTrue)
        this.currentLaunched = false;
      }
    }
    else if (this.currentLaunched == true) {
      if (launched == true) {
        this.deActivateButton(this.launchTrue);
        this.currentLaunched = null;
      }
      else {
        this.activateButton(this.launchFalse)
        this.deActivateButton(this.launchTrue)
        this.currentLaunched = false;
      }
    }
    else if(this.currentLaunched == false) {
      if (launched == false) {
        this.deActivateButton(this.launchFalse); 
        this.currentLaunched = null;
      }
      else {
        this.activateButton(this.launchTrue)
        this.deActivateButton(this.launchFalse)
        this.currentLaunched = true;
      }
    }
    this.programService.getAPIResponse("launch_success", launched);
  }

  queryLand(landed: boolean) {
    if (this.currentLanded == null) {
      if (landed == true) {
        this.activateButton(this.landTrue)
        this.deActivateButton(this.landFalse)
        this.currentLanded = true;
      }
      else {
        this.activateButton(this.landFalse)
        this.deActivateButton(this.landTrue)
        this.currentLanded = false;
      }
    }
    else if (this.currentLanded == true) {
      if (landed == true) {
        this.deActivateButton(this.landTrue);
        this.currentLanded = null;
      }
      else {
        this.activateButton(this.landFalse)
        this.deActivateButton(this.landTrue)
        this.currentLanded = false;
      }
    }
    else if(this.currentLanded == false) {
      if (landed == false) {
        this.deActivateButton(this.landFalse); 
        this.currentLanded = null;
      }
      else {
        this.activateButton(this.landTrue)
        this.deActivateButton(this.landFalse)
        this.currentLanded = true;
      }
    }
    this.programService.getAPIResponse("land_success", landed);
  }

}
