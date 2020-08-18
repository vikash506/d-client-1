import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  developedBy: string = 'Arnav Kumar (this.arnav@gmail.com)';
  constructor() { }

  ngOnInit(): void {
  }

}
