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
  @ViewChildren('btnYear', { read: ElementRef }) btn: QueryList<ElementRef>;
  @ViewChild('launchTrue', { static: true, read: ElementRef }) launchTrue: ElementRef;
  @ViewChild('launchFalse', { read: ElementRef }) launchFalse: ElementRef;
  @ViewChild('landTrue', { read: ElementRef }) landTrue: ElementRef;
  @ViewChild('landFalse', { read: ElementRef }) landFalse: ElementRef;

  // Static initialization of years
  years: number[] = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,];
  private currentYearIndex: number = -1;
  private currentLaunched: boolean = null;
  private currentLanded: boolean = null;
  yearIndex: number = -1;
  launchIndex: number = -1;
  landIndex: number = -1;

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
    if (this.yearIndex == i) {
      this.yearIndex = -1;
    }
    else {
      this.yearIndex = i;
    }

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
  queryLaunch(launched: boolean, i) {
    if (this.launchIndex == i) {
      this.launchIndex = -1;
    }
    else {
      this.launchIndex = i;
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
  queryLand(landed: boolean, i) {
    if (this.landIndex == i) {
      this.landIndex = -1;
    }
    else {
      this.landIndex = i;
    }

    this.programService.initiateAppLoader();       // Applies a 'loading...' effect while fetching data from endpoint
    this.programService.getAPIResponse("land_success", landed);   // Fetches data from API endpoint
  }

}
