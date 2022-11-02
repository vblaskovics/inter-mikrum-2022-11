import { Component, OnInit } from '@angular/core';
import {
  Observable,
  map,
  Subject,
  switchMap,
  tap,
  BehaviorSubject,
  combineLatest,
} from 'rxjs';
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

  selectedUserId$: Subject<number> = new Subject<number>();
  userIdModify$: Observable<string> = new Observable();
  completedFilter$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  filteredTodos$: Observable<Todo[]> = new Observable();

  constructor(
    private userService: UserService,
    private todoService: TodoService
  ) {
    this.users$ = this.userService.getUsers();
  }

  get completedFilter(): boolean {
    return this.completedFilter$.getValue();
  }

  set completedFilter(value: boolean) {
    this.completedFilter$.next(value);
  }

  ngOnInit(): void {
    // this.userIdModify$ = this.selectedUserId$.pipe(
    //   map((userId) => 'hello' + userId * 2)
    // );

    this.todosById$ = this.selectedUserId$.pipe(
      // tap((userId) => console.log('userId', userId)),
      switchMap((userId) => this.todoService.getTodosByUserId(userId))
    );

    // combineLatest([this.todosById$, this.completedFilter$]).subscribe(
    //   ([todos, completedFilter]) => {
    //     console.log('todos', todos);
    //     console.log('completedFilter', completedFilter);
    //   }
    // );

    this.filteredTodos$ = combineLatest([this.todosById$, this.completedFilter$]).pipe(
      map(([todos, completedFilter]) => {
        return todos.filter((todo) => {
          return completedFilter ? todo.completed : true;
        });
      })
    );
  }

  onSelectedUser(event: Event) {
    const userId = parseInt((event.target as HTMLSelectElement)?.value);
    this.selectedUserId$.next(userId);
  }
}
