import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTComponent } from './menu-t.component';

describe('MenuTComponent', () => {
  let component: MenuTComponent;
  let fixture: ComponentFixture<MenuTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
