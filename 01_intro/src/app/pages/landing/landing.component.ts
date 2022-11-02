import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post } from 'src/app/posts/post';
import { PostService } from 'src/app/posts/post.service';
import { Todo } from 'src/app/todos/todo';
import { TodoService } from 'src/app/todos/todo.service';
import { User } from 'src/app/users/user';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  users$: Observable<User[]>;
  todosById$: Observable<Todo[]> = new Observable();
  postsByUserId$: Observable<Post[]> = new Observable();
  completedFilter: boolean = false;

  constructor(
    private userService: UserService,
    private todoService: TodoService,
    private postService: PostService
  ) {
    this.users$ = this.userService.getUsers();
  }

  ngOnInit(): void {}

  onSelectedUser(event: Event) {
    const userId = parseInt((event.target as HTMLSelectElement)?.value);
    this.todosById$ = this.todoService.getTodosByUserId(userId).pipe(
      map((todos) => todos.filter((todo) => !this.completedFilter || todo.completed))
    );
    this.postsByUserId$ = this.postService.getPostsByUserId(userId);
  }

}
