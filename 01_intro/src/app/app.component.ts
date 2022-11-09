import { Component } from '@angular/core';
import { PostService } from './posts/post.service';
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
    this.getPostsWithUsernameSubscribe();
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
}
