import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { Location } from '@angular/common';
import { tick, fakeAsync } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'mock',
  template: '<p>Mock Component</p>',
})
class MockComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: MockComponent },
          { path: 'users', component: MockComponent },
          { path: 'posts', component: MockComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a navbar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-test="navbar"]')).toBeTruthy();
  });

  it('should render a navbar with a brand', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-test="navbar-brand"]')).toBeTruthy();
  });

  it('should navigate to home when clicking on the brand', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brand = compiled.querySelector('[data-test="navbar-brand"]') as HTMLAnchorElement;
    expect(brand).toBeTruthy();
    brand.click();
    tick();
    const location = TestBed.inject(Location);
    expect(location.path()).toBe('/home');
  }));

  it('should navigate to users when clicking on users link', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    const usersLink = compiled.querySelector('[data-test="users-link"]') as HTMLAnchorElement;
    expect(usersLink).toBeTruthy();
    usersLink.click();
    tick();
    const location = TestBed.inject(Location);
    expect(location.path()).toBe('/users');
  }));

  it('should navigate to posts when clickinkg on posts link', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    const postsLink = compiled.querySelector('[data-test="posts-link"]') as HTMLAnchorElement;
    expect(postsLink).toBeTruthy();
    postsLink.click();
    tick();
    const location = TestBed.inject(Location);
    expect(location.path()).toBe('/posts');
  }));
});
