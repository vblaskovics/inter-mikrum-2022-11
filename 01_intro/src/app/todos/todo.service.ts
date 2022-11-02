import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private API:string = 'https://jsonplaceholder.typicode.com/todos'
  
  constructor(private httpClient: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.API);
  }

  getTodosByUserId(userId: number): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.API}?userId=${userId}`);
  }

}