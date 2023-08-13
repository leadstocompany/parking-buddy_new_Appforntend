import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuttleHoursComponent } from './shuttle-hours.component';

describe('ShuttleHoursComponent', () => {
  let component: ShuttleHoursComponent;
  let fixture: ComponentFixture<ShuttleHoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShuttleHoursComponent]
    });
    fixture = TestBed.createComponent(ShuttleHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
