import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HomeComponent } from './home.component';

@Component
({
  selector: 'mock',
  template: '<p>Mock Component</p>',
})
class MockComponent {}


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [RouterTestingModule.withRoutes([
        { path: 'users', component: MockComponent },
      ])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to users', fakeAsync(() => {
    expect(component).toBeTruthy();
    tick();
    const location = TestBed.inject(Location);
    expect(location.path()).toBe('/users');
  }));


});
