import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPricingComponent } from './edit-pricing.component';

describe('EditPricingComponent', () => {
  let component: EditPricingComponent;
  let fixture: ComponentFixture<EditPricingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPricingComponent]
    });
    fixture = TestBed.createComponent(EditPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
