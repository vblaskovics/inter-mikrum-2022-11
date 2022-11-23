import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Location } from '@angular/common';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'mock-component',
  template: '<p>mock</p>'
})
class MockComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: MockComponent},
          { path: 'users', component: MockComponent}
        ])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a brand text inside the header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brand = compiled.querySelector('[data-test="header-brand"]');
    expect(brand).toBeTruthy();
  });
  
  it('should navigate to /home when clicking on the brand', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brand = compiled.querySelector('[data-test="header-brand"]') as any;
    expect(brand).toBeTruthy();
    const location = TestBed.inject(Location);
    expect(location.path()).toBe('');
    brand.click();
    tick();
    expect(location.path()).toBe('/home');
  }));
  
  it('should navigate to /users when clicking on users nav', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    const usersNav = compiled.querySelector('[data-test="header-users-nav"]') as any;
    expect(usersNav).toBeTruthy();
    const location = TestBed.inject(Location);
    expect(location.path()).toBe('');
    usersNav.click();
    tick();
    expect(location.path()).toBe('/users');
  }));


});
