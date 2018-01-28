import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ReservationService } from './reservation.service';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { DateTableComponent } from './date-table/date-table.component';
import { DateEditorComponent } from './date-editor/date-editor.component';
import { RoomsEditorComponent } from './rooms-editor/rooms-editor.component';
import { ReservationComponent } from './reservation/reservation.component';

const appRoutes: Routes = [
  { path: '', component: ReservationComponent },
  { path: 'roomseditor', component: RoomsEditorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DateSelectorComponent,
    DateTableComponent,
    DateEditorComponent,
    RoomsEditorComponent,
    ReservationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [ReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
