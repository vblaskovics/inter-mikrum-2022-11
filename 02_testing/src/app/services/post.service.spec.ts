import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';

describe('PostService', () => {
  let service: PostService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostService);
    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of posts', () => {
    service.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(1);
      expect(posts[0].id).toBe(1);
    });
    const dummyPosts = [
      {
        userId: 1,
        id: 1,
        title: 'title 1',
        body: 'body 1',
      },
    ];
    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(dummyPosts);
  });

  it('should return a post with username', () => {
    service.getPostsWithUsername().subscribe((posts) => {
      expect(posts.length).toBe(1);
      expect(posts[0].id).toBe(1);
      expect(posts[0].username).toBe('username 1');
    });

    const dummyPosts = [
      {
        userId: 1,
        id: 1,
        title: 'title 1',
        body: 'body 1',
        user: {
          id: 1,
          username: 'username 1',
        },
      },
    ];
    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts?_expand=user'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(dummyPosts);
  });
});
