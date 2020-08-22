import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LeftComponent } from '../../components/left/left.component';
import { MainComponent } from '../../components/main/main.component';



@NgModule({
  declarations: [HomeComponent, LeftComponent, MainComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
