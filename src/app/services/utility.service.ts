import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  activateButton(btn: ElementRef) {
    btn.nativeElement.style.background = "#7aba04";   // Activage Button
  }
  deActivateButton(btn: ElementRef) {
    btn.nativeElement.style.background = "#c5e09b";   // Deactivate Button
  }
}
