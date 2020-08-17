import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { Program } from '@models/program.model';


@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private programsAPIUrl: string = environment.programsAPIUrl;
  private years: [];

  constructor(
    private http: HttpClient
  ) { console.log("hello") }

  getProgramsWithoutFilter(): Observable<Program[]> {
    console.log("hello")
    return this.http.get<Program[]>(this.programsAPIUrl);
  }

  setAPIResponse(res: []) {
    this.years = res;
  }
}
