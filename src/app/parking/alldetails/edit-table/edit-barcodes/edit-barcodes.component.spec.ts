import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBarcodesComponent } from './edit-barcodes.component';

describe('EditBarcodesComponent', () => {
  let component: EditBarcodesComponent;
  let fixture: ComponentFixture<EditBarcodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBarcodesComponent]
    });
    fixture = TestBed.createComponent(EditBarcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
