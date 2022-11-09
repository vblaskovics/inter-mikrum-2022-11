import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todos/todo.service';
import { withLatestFrom, map, Observable, switchMap, tap, timer } from 'rxjs';
import { Todo } from 'src/app/todos/todo';

@Component({
  selector: 'app-landing-todobyname-stream',
  templateUrl: './landing-todobyname-stream.component.html',
  styleUrls: ['./landing-todobyname-stream.component.css'],
})
export class LandingTodobynameStreamComponent implements OnInit {
  todos$:Observable<Todo[]> = new Observable<Todo[]>;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // this.todos$ = timer(0, 2000).pipe(
    //   tap(() => console.log('todo stream')),
    //   switchMap(() => {
    //     return this.todoService.getTodosByUsername('Bret')
    //   })
    // );

    this.todos$ = this.todoService.getBretsTodosStream();

  }
}
