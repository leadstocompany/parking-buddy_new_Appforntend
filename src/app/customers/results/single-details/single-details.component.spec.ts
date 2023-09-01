import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDetailsComponent } from './single-details.component';

describe('SingleDetailsComponent', () => {
  let component: SingleDetailsComponent;
  let fixture: ComponentFixture<SingleDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleDetailsComponent]
    });
    fixture = TestBed.createComponent(SingleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
