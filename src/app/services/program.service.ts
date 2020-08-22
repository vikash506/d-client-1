import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, from, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Program } from '../models/program.model';
import { Chart } from '../models/Chart.model';


@Injectable({
  providedIn: 'root'
})
export class ProgramService implements OnDestroy {

  private programsAPIUrl: string = environment.programsAPIUrl;
  private qArray: any[];
  private query: string = '';
  private programs: Program[];
  private programsSubject = new Subject<Program[]>();
  private programSubscription: Subscription;
  private charts: Chart[] = [];
  private chartsSubject = new Subject<Chart[]>();
  private chartSubscription: Subscription;

  constructor(
    private http: HttpClient
  ) { }

  // @Title: Fetch data from the API endpoint and form the chart
  // @Signature: no parameters or returns.
  // @Desc: {
  //  1: It requests API endpoint for data
  //  2: Prepares an array string for launch_year
  //  3: Prepares charts of type Charts[] with the years array
  //  4: Informs the app for the preparedness of Chart[]
  // }   
  public prepareChartData() {
    this.chartSubscription = this.http.get<string[]>(this.programsAPIUrl)
      .pipe(map((item: any[]) => item.map((data: any) => data.launch_year)))
      .subscribe(years => {
        years.forEach(y => {
          if (this.charts.length == 0) {
            this.charts.push(new Chart(y, 1));
          }
          else if (this.charts.filter(r => r.year === y).length > 0) {
            let i = this.charts.findIndex(j => j.year == y);
            let chart = new Chart(y, this.charts[i].launches + 1)
            this.charts[i] = chart;
          }
          else {
            if (this.charts.length > 0 && parseInt(y) - parseInt(this.charts[this.charts.length - 1].year) > 1) {
              let j = this.charts.length;
              for (let i = parseInt(this.charts[this.charts.length - 1].year) + 1; i < parseInt(y); i++) {
                this.charts[j++] = new Chart('' + i, 0);
              }
            }
            this.charts.push(new Chart(y, 1));
          }
        })
        return this.chartsSubject.next(this.charts);
      });
  }

  // @Title: return observable of Chart[]
  // @Signature: takes no paramenter, returns Observable<Chart[]>
  public getChartData(): Observable<Chart[]> {
    this.charts = [];
    this.prepareChartData();
    return this.chartsSubject.asObservable();
  }


  // @Title: Preparing filter string to form query string for the API)
  // @Signature: takes key and values of the query and returns the new query string
  // @Desc: {
  //  1: It adds the filter to the query string when any filter is selected
  //  2: It removes the filter from the query string when any filter is deselected
  //  3: It adds and removes multiple such filters
  // }  
  private configureAPIUrl(key: string, value: any): string {
    if (key == '') {
      this.query = '';
    }
    else {
      if (this.query.includes(`&${key}=${value}`)) {
        this.query = this.query.replace(`&${key}=${value}`, '')
      }
      else if (this.query.includes(`&${key}`)) {
        let qSub = this.query.substring(this.query.indexOf(key) - 1, this.query.substring(1).indexOf('&') + 1)
        if (qSub == '') qSub = this.query.substring(this.query.indexOf(key) - 1)
        this.query = this.query.replace(
          qSub,
          '');
        this.query += `&${key}=${value}`
      }
      else {
        this.query += `&${key}=${value}`;
      }
    }
    return this.query;
  }


  // @Title: Fetch data from the API endpoint
  // @Signature: takes key and values of the query and subscribes to it
  // @Desc: {
  //  1: It requests 'configureAPIUrl(key: string, value: any): string' method for the API url with query string
  //  2: Requests data from the API endpoint based on the url + query string
  //  3: Subscribes to it
  //  4: Filters the incoming stream to retain only the required data
  //  5: Updates the filtered data to the programs variable
  // }   
  getAPIResponse(key: string, value: any) {
    this.programSubscription = this.http.get<Program[]>(this.programsAPIUrl + this.configureAPIUrl(key, value))
      .pipe(map((item: any[]) => item.map((data: any) => new Program(
        data.mission_id,
        data.flight_number,
        data.mission_name,
        data.launch_year,
        data.launch_success,
        data.land_success,
        data.links.mission_patch_small
      ))))
      .subscribe(data => {
        this.programs = data;
        this.programsSubject.next(this.programs);
      });
  }

  // @Desc: To show the spinner while the data is being fetched from the API endpoint
  initiateAppLoader(): void {
    this.programsSubject.next(null);
  }

  // @Desc: To show the spinner while the data is being fetched from the API endpoint
  getPrograms(): Observable<Program[]> {
    return this.programsSubject.asObservable();
  }

  ngOnDestroy(): void {
    if (this.programSubscription)
      this.programSubscription.unsubscribe();
    if (this.chartSubscription)
      this.chartSubscription.unsubscribe();
  }
}
