import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { PostService, PostWithUsername } from 'src/app/services/post.service';

import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  let postServiceStub: Partial<PostService> = {
    getPostsWithUsername(): Observable<PostWithUsername[]> {
        return of([
          {
            id: 1,
            userId: 1,
            title: 'title 1',
            body: 'body 1',
            username: 'username 1'
          },
          {
            id: 2,
            userId: 1,
            title: 'title 2',
            body: 'body 2',
            username: 'username 1'
          }
        ]);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
      providers: [ { provide: PostService, useValue: postServiceStub } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of posts with username', () => {
    component.posts$.subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts[0].username).toBe('username 1');
    })
  });

  it('should a table with posts', () => {
    const compiled = fixture.nativeElement;

    const postItems = compiled.querySelectorAll('[data-test="post-item"]');

    expect(postItems.length).toBe(2);
  });
});
