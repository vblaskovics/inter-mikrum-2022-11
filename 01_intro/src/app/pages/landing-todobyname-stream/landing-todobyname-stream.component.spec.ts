import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTodobynameStreamComponent } from './landing-todobyname-stream.component';

describe('LandingTodobynameStreamComponent', () => {
  let component: LandingTodobynameStreamComponent;
  let fixture: ComponentFixture<LandingTodobynameStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingTodobynameStreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingTodobynameStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
