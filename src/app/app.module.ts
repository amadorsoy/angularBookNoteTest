import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import NotesFixture from './notes.fixture';
import { NotesService } from './notes.service';

export function notesFactory() {
  const service = new NotesService();
  // tslint:disable-next-line: no-string-literal
  service['notes'] = NotesFixture;
  return service;
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    {
      provide: NotesService,
      useFactory: notesFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
