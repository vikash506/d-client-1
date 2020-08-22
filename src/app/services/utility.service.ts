import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  activateButton(btn: ElementRef) {
    btn.nativeElement.style.background = "#000000";   // Activage Button
  }
  deActivateButton(btn: ElementRef) {
    btn.nativeElement.style.background = "#727256";   // Deactivate Button
  }
}
