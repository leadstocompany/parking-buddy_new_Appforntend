import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlackoutsComponent } from './edit-blackouts.component';

describe('EditBlackoutsComponent', () => {
  let component: EditBlackoutsComponent;
  let fixture: ComponentFixture<EditBlackoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBlackoutsComponent]
    });
    fixture = TestBed.createComponent(EditBlackoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
