import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';
import { LetterAppComponent } from './letter-app.component';

import { LetterService } from './services/letter.service';
import { RepresentativeService } from './services/representative.service';

@NgModule({
  declarations: [
    AppComponent,
    LetterAppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  providers: 
  [
    LetterService, 
    RepresentativeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
