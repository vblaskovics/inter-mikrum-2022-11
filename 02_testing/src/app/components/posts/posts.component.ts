import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService, PostWithUsername } from 'src/app/services/post.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts$:Observable<PostWithUsername[]> = new Observable();

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPostsWithUsername() as Observable<PostWithUsername[]>;
  }

}
