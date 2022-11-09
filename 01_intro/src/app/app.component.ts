import { Component } from '@angular/core';
import { firstValueFrom, forkJoin, map, switchMap, tap } from 'rxjs';
import { Post } from './posts/post';
import { PostService } from './posts/post.service';
import { TodoService } from './todos/todo.service';
import { User } from './users/user';
import { UserService } from './users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = '01_intro';

  pageState = 0;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private todoService: TodoService
  ) {}

  increaseState() {
    this.pageState += 1;
    if (this.pageState === 3)
      this.pageState = 0;
  }

  ngOnInit() {
    // this.getPostsWithUsernameSubscribe();
    // this.getPostsWithUsernamePromise();
    // this.getPostsWithUsernameAwait();
    // this.getPostsWithUsernameStream();
    // this.getPostsWithUsernameStream2();
    this.getTodosByUsername('Bret');
    this.getTodosByUsernameAwait('Bret');
  }

  getPostsWithUsernameSubscribe(): void {
    this.userService.getUsers().subscribe((users) => {
      this.postService.getPosts().subscribe((posts) => {
        const postsWithUsername = posts.map((post) => {
          const user = users.find((user) => user.id === post.userId);
          if (!user) return post;
          return { ...post, username: user.username };
        });
        console.log('Posts with username', postsWithUsername);
      });
    });
  }

  getPostsWithUsernamePromise(): void {
    let postsWithUsername;
    let usersPromise = firstValueFrom(this.userService.getUsers());
    usersPromise.then((users: User[]) => {
      let postsPromise = firstValueFrom(this.postService.getPosts());
      postsPromise.then((posts: Post[]) => {
        postsWithUsername = posts.map((post) => {
          const user = users.find((user) => user.id === post.userId);
          if (!user) return post;
          return { ...post, username: user.username };
        });
        console.log('Posts with username', postsWithUsername);
      });
    });
  }

  async getPostsWithUsernameAwait() {
    let users = await firstValueFrom(this.userService.getUsers());
    let posts = await firstValueFrom(this.postService.getPosts());

    let postsWithUsername = posts.map((post) => {
      const user = users.find((user) => user.id === post.userId);
      if (!user) return post;
      return { ...post, username: user.username };
    });
    console.log('Posts with username', postsWithUsername);
  }

  getPostsWithUsernameStream() {
    forkJoin({
      users: this.userService.getUsers(),
      posts: this.postService.getPosts(),
    }).subscribe((res) => {
      let users = res.users;
      let posts = res.posts;

      let postsWithUsername = posts.map((post) => {
        const user = users.find((user) => user.id === post.userId);
        if (!user) return post;
        return { ...post, username: user.username };
      });
      console.log('Posts with username', postsWithUsername);
    });
  }

  getPostsWithUsernameStream2() {
    let forkJoinOps = {
      users: this.userService.getUsers(),
      posts: this.postService.getPosts(),
    } 
    forkJoin(forkJoinOps)
      .pipe(
        map((res:{users:Array<User>, posts:Array<Post>}) => {
          let users = res.users;
          let posts = res.posts;
          return posts.map((post) => {
            const user = users.find((user) => user.id === post.userId);
            if (!user) return post;
            return { ...post, username: user.username };
          });
        }),
        tap((res) => console.log('Posts with username', res))
      )
      .subscribe();
  }

  // console.log
  // NFR: ne töltsd le az összes usert és todot!!!
  getTodosByUsername(username:string) {
    this.userService.getUserByUsername(username).pipe(
      switchMap((user)=> this.todoService.getTodosByUserId(user.id)),
      tap((todos) => console.log('getTodosByUsername', todos))
    ).subscribe();
  }
  
  async getTodosByUsernameAwait(username:string) {
    let user = await firstValueFrom(this.userService.getUserByUsername(username));
    let todo = await firstValueFrom(this.todoService.getTodosByUserId(user.id));
    console.log('getTodosByUsernameAwait', todo);
  }
}
