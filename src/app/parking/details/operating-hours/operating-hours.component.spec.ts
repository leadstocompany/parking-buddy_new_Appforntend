import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingHoursComponent } from './operating-hours.component';

describe('OperatingHoursComponent', () => {
  let component: OperatingHoursComponent;
  let fixture: ComponentFixture<OperatingHoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperatingHoursComponent]
    });
    fixture = TestBed.createComponent(OperatingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
