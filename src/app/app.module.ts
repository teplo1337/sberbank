import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ReservationService } from './reservation.service';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { DateTableComponent } from './date-table/date-table.component';


@NgModule({
  declarations: [
    AppComponent,
    DateSelectorComponent,
    DateTableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
