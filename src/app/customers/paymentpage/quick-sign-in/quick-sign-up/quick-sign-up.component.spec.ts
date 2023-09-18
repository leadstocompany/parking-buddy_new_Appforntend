import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSignUpComponent } from './quick-sign-up.component';

describe('QuickSignUpComponent', () => {
  let component: QuickSignUpComponent;
  let fixture: ComponentFixture<QuickSignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickSignUpComponent]
    });
    fixture = TestBed.createComponent(QuickSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
