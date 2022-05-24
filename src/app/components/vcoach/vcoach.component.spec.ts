import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcoachComponent } from './vcoach.component';

describe('VcoachComponent', () => {
  let component: VcoachComponent;
  let fixture: ComponentFixture<VcoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcoachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
