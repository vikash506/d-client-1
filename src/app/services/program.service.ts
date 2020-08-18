import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, from, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Program } from '../models/program.model';


@Injectable({
  providedIn: 'root'
})
export class ProgramService implements OnDestroy {

  private programsAPIUrl: string = environment.programsAPIUrl;
  private query: string = '';
  private programs: Program[];
  private programsSubject = new Subject<Program[]>();
  private programSubscription: Subscription;

  constructor(
    private http: HttpClient
  ) { }


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
        let qSub = this.query.substring(this.query.indexOf(key) -1, this.query.substring(1).indexOf('&') + 1)
        if(qSub == '') qSub = this.query.substring(this.query.indexOf(key) -1)
        this.query = this.query.replace(
          qSub,
          '');
        this.query += `&${key}=${value}`
      }
      else {
        this.query += `&${key}=${value}`;
      }
    }

    console.log(this.query)


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
    this.programSubscription.unsubscribe();
  }
}
