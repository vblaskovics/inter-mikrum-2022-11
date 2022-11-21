import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add two numbers', () => {
    expect(service.addTwoNumbers(2, 6)).toBe(8);
    expect(service.addTwoNumbers(2, 7)).not.toBe(8);
  });

  it('should return a list of posts', () => {
    service.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(1);
      expect(posts[0].id).toBe(1);
    });

    const dummyResponseData = [
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
    req.flush(dummyResponseData);
  });

  it('should return a list of posts with username', () => {
    service.getPostsWithUsername().subscribe((posts) => {
      expect(posts.length).toBe(1);
      expect(posts[0].id).toBe(1);
      expect(posts[0].username).toBe('username 1');
    });

    const dummyResponseData = [
      {
        userId: 1,
        id: 1,
        title: 'title 1',
        body: 'body 1',
        user: {
          username: 'username 1'
        }
      },
    ];

    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts?_expand=user'
    );

    expect(req.request.method).toEqual('GET');
    req.flush(dummyResponseData);
  });
});
