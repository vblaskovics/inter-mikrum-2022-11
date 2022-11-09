import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTodobynameComponent } from './landing-todobyname.component';

describe('LandingTodobynameComponent', () => {
  let component: LandingTodobynameComponent;
  let fixture: ComponentFixture<LandingTodobynameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingTodobynameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingTodobynameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
