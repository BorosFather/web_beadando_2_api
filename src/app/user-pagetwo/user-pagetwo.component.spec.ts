import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPagetwoComponent } from './user-pagetwo.component';

describe('UserPagetwoComponent', () => {
  let component: UserPagetwoComponent;
  let fixture: ComponentFixture<UserPagetwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPagetwoComponent]
    });
    fixture = TestBed.createComponent(UserPagetwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
