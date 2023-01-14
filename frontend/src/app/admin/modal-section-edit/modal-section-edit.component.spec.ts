import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSectionEditComponent } from './modal-section-edit.component';

describe('ModalSectionEditComponent', () => {
  let component: ModalSectionEditComponent;
  let fixture: ComponentFixture<ModalSectionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSectionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
