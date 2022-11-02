import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API:string = 'https://jsonplaceholder.typicode.com/users'
  
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API);
  }

}