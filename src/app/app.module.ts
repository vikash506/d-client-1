import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftComponent } from './components/left/left.component';
import { ProgramService } from './services/program.service';
import { MainComponent } from './components/main/main.component';
import { LayoutsModule } from './layouts/layouts.module';
import { FooterComponent } from './components/footer/footer.component';
import { PipesModule } from './pipes/pipes.module';
import { UtilityService } from './services/utility.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftComponent,
    MainComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutsModule,
    PipesModule
  ],
  providers: [
    ProgramService,
    UtilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
