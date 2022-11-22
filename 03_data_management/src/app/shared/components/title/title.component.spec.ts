import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';

// Mock Host component
@Component({
  template: '<app-title [title]="titleInput"></app-title>',
})
class TestHostComponent {
  titleInput = 'Test Title';
}

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestHostComponent ],
      imports: [TitleComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be initialized with title as text from input attribute', () => {
    let compiled = fixture.nativeElement.childNodes[0];
    expect(compiled.textContent).toContain('Test Title');
  });

  it('should contain a material icon', () => {
    let compiled = fixture.nativeElement.childNodes[0];
    expect(compiled.querySelector('mat-icon')).toBeTruthy();
  });

});
