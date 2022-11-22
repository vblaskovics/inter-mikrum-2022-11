import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @HostBinding('attr.data-test') dataTest = 'home';

  constructor(private router:Router) {}

  ngOnInit(): void {
    this.router.navigate(['/users']);
  }
}
