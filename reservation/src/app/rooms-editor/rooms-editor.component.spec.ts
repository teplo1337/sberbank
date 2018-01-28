import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsEditorComponent } from './rooms-editor.component';

describe('RoomsEditorComponent', () => {
  let component: RoomsEditorComponent;
  let fixture: ComponentFixture<RoomsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
