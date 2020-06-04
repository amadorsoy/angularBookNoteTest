import { Component, Inject, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notes: Note[] = [
    {
      id: 1,
      title: 'Mock Title',
      body: 'mock body',
      color: '#ff0000',
      favourite: true
    }
  ];
  selected: Note;
  showForm = false;
  activeItem = -1;
  noteForm: FormGroup;

  constructor(private service: NotesService) {
    this.initSelected();
  }

  ngOnInit() {
    this.loadNotes();
    this.noteForm  = new FormGroup({
      title: new FormControl(this.selected.title, [Validators.required]),
      body: new FormControl(this.selected.body),
      color: new FormControl(this.selected.color),
      favourite: new FormControl(this.selected.favourite),
    });
  }

  get titleError() {
    if (this.noteForm.get('title').errors !== null){
      return true;
    }
    return false;
  }

  getNotes() {
    return this.notes;
  }

  private loadNotes(): void {
    // TODO: Retrieve a list of notes from the service and store them locally
    this.notes = this.service.getNotes();
  }

  initSelected(){
    this.selected = {
      id: null,
      title : null,
      body: null,
      color: '#ff0000',
      favourite: false
    };
  }

  changeTitle(event: any){
    this.patchForm();
  }

  patchForm(){
    this.noteForm.controls.title.setValue(this.selected.title);
    this.noteForm.controls.color.setValue(this.selected.color);
    this.noteForm.controls.body.setValue(this.selected.body);
    this.noteForm.controls.favourite.setValue(this.selected.favourite);
  }

  selectNote(note, indexItem) {
    this.activeItem = indexItem;
    // TODO: prevent changing original object
    this.selected = {
      id: note.id,
      title: note.title,
      body: note.body,
      color: note.color,
      favourite: note.favourite
    };
    this.showForm = true;
    this.patchForm();
  }

  newNote() {
    this.selected = {
      id: null,
      title: '',
      body: '',
      color: '',
      favourite: false
    };
    this.showForm = true;
    this.patchForm();
  }

  saveNote(note) {
    // TODO: save note
    const savedNote = this.service.saveNote(note);
    this.initSelected();
    this.showForm = false;
  }
}
