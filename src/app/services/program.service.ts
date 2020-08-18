import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Program } from '../models/program.model';


@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private programsAPIUrl: string = environment.programsAPIUrl;
  private query: string = '';
  private programs: Program[];
  private programsSubject = new Subject<Program[]>();

  constructor(
    private http: HttpClient
  ) { }

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

  getAPIResponse(key: string, value: any) {
    this.http.get<Program[]>(this.programsAPIUrl + this.configureAPIUrl(key, value))
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

  getPrograms(): Observable<Program[]> {
    return this.programsSubject.asObservable();
  }
}
