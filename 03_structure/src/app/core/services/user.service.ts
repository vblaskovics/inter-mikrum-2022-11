import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { EnvironmentService } from './environment.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API: string;

  private users$ = new BehaviorSubject<User[]>([]);

  constructor(
    private httpClient: HttpClient,
    private environmentService: EnvironmentService
  ) {
    this.API = this.environmentService.getEnvironment().apiUrl;
  }

  public init() {
    this.httpClient.get<User[]>(this.API).
    subscribe((users) => {
      this.users$.next(users);
    });
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUserByUsername(username: string): Observable<User> {
    return this.httpClient
      .get<User[]>(`${this.API}?username=${username}`)
      .pipe(map((users) => users[0]));
  }

  createUser(user: User) {
    console.log('create user', user);
  }
}
