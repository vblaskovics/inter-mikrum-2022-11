import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/todos/todo';
import { TodoService } from 'src/app/todos/todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing-todobyname',
  templateUrl: './landing-todobyname.component.html',
  styleUrls: ['./landing-todobyname.component.css']
})
export class LandingTodobynameComponent implements OnInit {
  todos$: Observable<Todo[]> = new Observable<Todo[]>();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    setInterval(()=> {
      console.log("Get Bret's todos");
      this.todos$ = this.todoService.getTodosByUsername('Bret');
    }, 3000)
  }

}
