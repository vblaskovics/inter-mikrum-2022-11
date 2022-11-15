import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/user';
import { Observable, of } from 'rxjs';
import { UsersComponent } from './users.component';
import { UserService } from 'src/app/services/user.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  let userServiceStub: Partial<UserService> = {
    getUsers(): Observable<User[]> {
      return of([
        {
          id: 1,
          name: 'name 1',
          username: 'username 1',
          email: 'email 1',
        },
      ]) as Observable<User[]>;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [{ provide: UserService, useValue: userServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
