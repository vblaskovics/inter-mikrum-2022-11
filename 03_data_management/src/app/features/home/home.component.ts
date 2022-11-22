import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @HostBinding('attr.data-test') dataTest = 'home';

  apiUrl:string;

  constructor(private environmentService:EnvironmentService) {
    this.apiUrl = this.environmentService.getEnvironment().apiUrl;
  }

  ngOnInit(): void {}
}
