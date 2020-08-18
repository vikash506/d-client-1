import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Program } from '../models/program.model';


@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private programsAPIUrl: string = environment.programsAPIUrl;
  private 
  private programs: Program[];
  private programsSubject = new Subject<Program[]>();

  constructor(
    private http: HttpClient
  ) { }

  private configureAPIUrl(query: string): string {
    let queryKey = query.substring(1, query.indexOf('=')-1);
    console.log(this.programsAPIUrl.includes(query));
    
    if(this.programsAPIUrl.includes(query))
      this.programsAPIUrl = this.programsAPIUrl.replace(query, '');
    else if(this.programsAPIUrl.includes(queryKey)){
      this.programsAPIUrl = `${this.programsAPIUrl.substring(0, this.programsAPIUrl.indexOf(queryKey)-1)}${query}`;
    }
    else
      this.programsAPIUrl = `${this.programsAPIUrl}${query}`;
    console.log(this.programsAPIUrl);
    
    return this.programsAPIUrl;
  }

  getAPIResponse(query: string) {
    this.http.get<Program[]>(this.configureAPIUrl(query))
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
        console.log("helllljkljlkj");
        
        this.programs = data;
        this.programsSubject.next(this.programs);
      });
  }

  getPrograms(): Observable<Program[]> {
    return this.programsSubject.asObservable();
  }
}
