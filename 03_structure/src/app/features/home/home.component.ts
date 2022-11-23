import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from 'src/app/core/services/environment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  apiUrl:string;

  constructor(private environmentService: EnvironmentService) {
    this.apiUrl = this.environmentService.getEnvironment().apiUrl;
  }

  ngOnInit(): void {
  }

}
