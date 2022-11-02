import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post';

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
}
