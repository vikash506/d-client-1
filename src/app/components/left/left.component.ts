import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {

  // @Desc: selecting the dom elements for the filter buttons
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
    private programService: ProgramService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void { }

  // @Title: Filter for year (queryYear)
  // @Desc: {
  //  1: It applies filter for year on first click
  //  2: Toggles back to remove filter on Second click
  //  3: Applies css to highlight the year and removes it as well on toggle
  //  4: Clicking on another year removes filter and highlighting from previous selected one and applies to another
  // }   
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
        this.utilityService.deActivateButton(m)
      }
      else {
        if (i == j) {
          this.utilityService.activateButton(m)
        }
        else {
          this.utilityService.deActivateButton(m)
        }
      }
      j++;
    })
    this.programService.initiateAppLoader();
    this.programService.getAPIResponse('launch_year', year);
  }

  // @Title: Filter for launc - success / fail (queryLaunch)
  // @Desc: {
  //  1: It applies filter for Successful or failed launch
  //  2: Can toggle between true / false button to show successful or failed launch
  //  3: Applies css to highlight the year and removes it as well on toggle
  //  4: Toggling resets the filter and css for previous selection and applies to the next
  // } 
  queryLaunch(launched: boolean) {
    if (this.currentLaunched == null) {
      if (launched == true) {
        this.utilityService.activateButton(this.launchTrue)
        this.utilityService.deActivateButton(this.launchFalse)
        this.currentLaunched = true;
      }
      else {
        this.utilityService.activateButton(this.launchFalse)
        this.utilityService.deActivateButton(this.launchTrue)
        this.currentLaunched = false;
      }
    }
    else if (this.currentLaunched == true) {
      if (launched == true) {
        this.utilityService.deActivateButton(this.launchTrue);
        this.currentLaunched = null;
      }
      else {
        this.utilityService.activateButton(this.launchFalse)
        this.utilityService.deActivateButton(this.launchTrue)
        this.currentLaunched = false;
      }
    }
    else if (this.currentLaunched == false) {
      if (launched == false) {
        this.utilityService.deActivateButton(this.launchFalse);
        this.currentLaunched = null;
      }
      else {
        this.utilityService.activateButton(this.launchTrue)
        this.utilityService.deActivateButton(this.launchFalse)
        this.currentLaunched = true;
      }
    }
    this.programService.initiateAppLoader();        // Applies a 'loading...' effect while fetching data from endpoint
    this.programService.getAPIResponse("launch_success", launched); // Fetches data from API endpoint
  }

  // @Title: Filter for launc - success / fail (queryLand)
  // @Desc: {
  //  1: It applies filter for Successful or failed launch
  //  2: Can toggle between true / false button to show successful or failed land
  //  3: Applies css to highlight the year and removes it as well on toggle
  //  4: Toggling resets the filter and css for previous selection and applies to the next
  // } 
  queryLand(landed: boolean) {
    if (this.currentLanded == null) {
      if (landed == true) {
        this.utilityService.activateButton(this.landTrue)
        this.utilityService.deActivateButton(this.landFalse)
        this.currentLanded = true;
      }
      else {
        this.utilityService.activateButton(this.landFalse)
        this.utilityService.deActivateButton(this.landTrue)
        this.currentLanded = false;
      }
    }
    else if (this.currentLanded == true) {
      if (landed == true) {
        this.utilityService.deActivateButton(this.landTrue);
        this.currentLanded = null;
      }
      else {
        this.utilityService.activateButton(this.landFalse)
        this.utilityService.deActivateButton(this.landTrue)
        this.currentLanded = false;
      }
    }
    else if (this.currentLanded == false) {
      if (landed == false) {
        this.utilityService.deActivateButton(this.landFalse);
        this.currentLanded = null;
      }
      else {
        this.utilityService.activateButton(this.landTrue)
        this.utilityService.deActivateButton(this.landFalse)
        this.currentLanded = true;
      }
    }
    this.programService.initiateAppLoader();       // Applies a 'loading...' effect while fetching data from endpoint
    this.programService.getAPIResponse("land_success", landed);   // Fetches data from API endpoint
  }

}
