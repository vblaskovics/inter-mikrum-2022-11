import { Component } from '@angular/core';
import { firstValueFrom, forkJoin } from 'rxjs';
import { Post } from './posts/post';
import { PostService } from './posts/post.service';
import { User } from './users/user';
import { UserService } from './users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = '01_intro';

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit() {
    // this.getPostsWithUsernameSubscribe();
    // this.getPostsWithUsernamePromise();
    // this.getPostsWithUsernameAwait();
    this.getPostsWithUsernameStream();
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
    usersPromise.then((users:User[]) => {
      let postsPromise = firstValueFrom(this.postService.getPosts());
      postsPromise.then((posts:Post[]) => {
        postsWithUsername = posts.map((post) => {
          const user = users.find((user) => user.id === post.userId);
          if (!user) return post;
          return { ...post, username: user.username };
        });
        console.log('Posts with username', postsWithUsername);
      })
    })
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
      posts: this.postService.getPosts()
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
}
