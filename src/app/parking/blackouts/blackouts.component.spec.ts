import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackoutsComponent } from './blackouts.component';

describe('BlackoutsComponent', () => {
  let component: BlackoutsComponent;
  let fixture: ComponentFixture<BlackoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlackoutsComponent]
    });
    fixture = TestBed.createComponent(BlackoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
