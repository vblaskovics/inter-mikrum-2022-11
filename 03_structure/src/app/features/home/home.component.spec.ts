import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvironmentService } from 'src/app/core/services/environment.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: EnvironmentService,
          useValue: {
            getEnvironment: () => {
              return { apiUrl: 'https://test-api.url'}
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display API URL text from environment config file', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-test="api-url"]').textContent).toEqual(
      'https://test-api.url'
    );
  });
});
