import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDescriptionsComponent } from './edit-descriptions.component';

describe('EditDescriptionsComponent', () => {
  let component: EditDescriptionsComponent;
  let fixture: ComponentFixture<EditDescriptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDescriptionsComponent]
    });
    fixture = TestBed.createComponent(EditDescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
