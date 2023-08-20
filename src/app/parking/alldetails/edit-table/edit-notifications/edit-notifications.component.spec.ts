import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotificationsComponent } from './edit-notifications.component';

describe('EditNotificationsComponent', () => {
  let component: EditNotificationsComponent;
  let fixture: ComponentFixture<EditNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNotificationsComponent]
    });
    fixture = TestBed.createComponent(EditNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
