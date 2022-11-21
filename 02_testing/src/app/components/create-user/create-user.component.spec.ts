import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['createUser']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createUser with form data when submit button is clicked', () => {
    const compiled = fixture.nativeElement;
    const idInput = compiled.querySelector('[data-test="id-input"]');
    const usernameInput = compiled.querySelector(
      '[data-test="username-input"]'
    );
    const emailInput = compiled.querySelector('[data-test="email-input"]');

    idInput.value = 1;
    usernameInput.value = 'username';
    emailInput.value = 'email';

    idInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const submitButton = compiled.querySelector('[data-test="submit-button"]');
    submitButton.click();

    expect(mockUserService.createUser).toHaveBeenCalledOnceWith({
      id: '1',
      username: 'username',
      email: 'email',
    });
  });

  it('should not call createUser with invalid form data', () => {
    const compiled = fixture.nativeElement;
    const submitButton = compiled.querySelector('[data-test="submit-button"]');
    submitButton.click();

    expect(mockUserService.createUser).not.toHaveBeenCalled();
  });
});
