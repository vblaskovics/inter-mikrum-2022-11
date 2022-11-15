import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post';
import { User } from '../models/user';

export type PostWithUser = Post & { user: User };
export type PostWithUsername = Post & { username: string };

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private API: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.API);
  }

  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.API}?userId=${userId}`);
  }

  getPostsWithUsername(): Observable<PostWithUsername[]> {
    return this.httpClient
      .get<PostWithUser[]>(`${this.API}?_expand=user`)
      .pipe(
        map((posts) =>
          posts.map((post) => ({ ...post, username: post.user.username }))
        )
      );
  }
}
