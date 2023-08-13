import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBlackoutsComponent } from './all-blackouts.component';

describe('AllBlackoutsComponent', () => {
  let component: AllBlackoutsComponent;
  let fixture: ComponentFixture<AllBlackoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBlackoutsComponent]
    });
    fixture = TestBed.createComponent(AllBlackoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
