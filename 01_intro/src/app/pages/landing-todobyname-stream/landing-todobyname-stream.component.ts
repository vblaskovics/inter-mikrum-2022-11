import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todos/todo.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-landing-todobyname-stream',
  templateUrl: './landing-todobyname-stream.component.html',
  styleUrls: ['./landing-todobyname-stream.component.css']
})
export class LandingTodobynameStreamComponent implements OnInit {

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    timer(0, 2000).subscribe((e) => {
      console.log(e);
    })
  }

}
