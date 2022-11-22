import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { EnvironmentService } from 'src/app/shared/services/environment.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'mock',
  template: '<p>Mock Component</p>',
})
class MockComponent {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MockComponent],
      imports: [SharedModule, RouterTestingModule.withRoutes([{ path: 'users', component: MockComponent }])],
      providers: [
        {
          provide: EnvironmentService,
          useValue: {
            getEnvironment: () => {
              return { apiUrl: 'https://test-api.url' };
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain API URL text from environment file', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-test="api-url"]').textContent).toEqual(
      'https://test-api.url'
    );
  });
});
