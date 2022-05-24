import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserhandlerComponent } from './userhandler.component';

describe('UserhandlerComponent', () => {
  let component: UserhandlerComponent;
  let fixture: ComponentFixture<UserhandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserhandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserhandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
