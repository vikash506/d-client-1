import { Component, OnInit } from '@angular/core';

import { ProgramService } from '../../services/program.service';
import { Program } from '../../models/program.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  programs: Program[];
  program: Program = new Program(['id'], 1, 'mission', '2000', true, true,'string');
    
  constructor(
    private programService: ProgramService
  ) { }

  ngOnInit(): void {
    console.log('hellokkk');
    
    this.programService.getPrograms()
    .subscribe(res => {
      console.log((res));
      this.programs = res;
      console.log(this.programs);
      
    });

    this.programService.getAPIResponse('');
  }

}
