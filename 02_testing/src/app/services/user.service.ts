import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.httpClient
      .get<User[]>(`${this.API}?username=${username}`)
      .pipe(map((users) => users[0]));
  }
}
