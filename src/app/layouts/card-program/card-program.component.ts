import { Component, OnInit, Input } from '@angular/core';
import { Program } from 'src/app/models/program.model';

@Component({
  selector: 'app-card-program',
  templateUrl: './card-program.component.html',
  styleUrls: ['./card-program.component.scss']
})
export class CardProgramComponent implements OnInit {

  @Input() program: Program;
  constructor() { }

  ngOnInit(): void {
  }

}
