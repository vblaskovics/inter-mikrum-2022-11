import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from 'src/app/todos/todo';
import { TodoService } from 'src/app/todos/todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing-todobyname',
  templateUrl: './landing-todobyname.component.html',
  styleUrls: ['./landing-todobyname.component.css']
})
export class LandingTodobynameComponent implements OnInit, OnDestroy {
  todos$: Observable<Todo[]> = new Observable<Todo[]>();
  todoArr: Todo[] = [];
  intervalCall:any;

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    // this.intervalCall = setInterval(()=> {
    //   console.log("Get Bret's todos");
    //   this.todos$ = this.todoService.getTodosByUsername('Bret');
    //   this.todos$.subscribe((todos) => {
    //     this.todoArr = todos
    //   });
    // }, 3000);
    this.intervalCall = setInterval(()=> {
      console.log("Get Bret's todos");
      this.todos$ = this.todoService.getTodosByUsername('Bret');
    }, 3000)
  }

  ngOnDestroy(): void {
      console.log('destroy');
      clearInterval(this.intervalCall);
  }

}
