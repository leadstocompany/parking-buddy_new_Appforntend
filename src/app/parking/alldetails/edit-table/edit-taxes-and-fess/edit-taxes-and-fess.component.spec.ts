import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxesAndFessComponent } from './edit-taxes-and-fess.component';

describe('EditTaxesAndFessComponent', () => {
  let component: EditTaxesAndFessComponent;
  let fixture: ComponentFixture<EditTaxesAndFessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaxesAndFessComponent]
    });
    fixture = TestBed.createComponent(EditTaxesAndFessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
