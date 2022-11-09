import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Todo } from './todo';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private API:string = 'https://jsonplaceholder.typicode.com/todos'
  
  constructor(private httpClient: HttpClient, private userService:UserService) {}

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.API);
  }

  getTodosByUserId(userId: number): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.API}?userId=${userId}`);
  }

  getTodosByUsername(username:string) {
    return this.userService.getUserByUsername(username).pipe(
      switchMap((user)=> this.getTodosByUserId(user.id)),
    );
  }

}