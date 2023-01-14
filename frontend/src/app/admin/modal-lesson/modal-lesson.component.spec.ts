import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLessonComponent } from './modal-lesson.component';

describe('ModalLessonComponent', () => {
  let component: ModalLessonComponent;
  let fixture: ComponentFixture<ModalLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLessonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
