import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ReservationService } from './reservation.service';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { DateTableComponent } from './date-table/date-table.component';
import { DateEditorComponent } from './date-editor/date-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    DateSelectorComponent,
    DateTableComponent,
    DateEditorComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [ReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
