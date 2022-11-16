import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  myForm: FormGroup;

  constructor(fb: FormBuilder, private userService: UserService) {
    this.myForm = fb.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.myForm.valid) {
      this.userService.createUser(this.myForm.value as User);
    } else {
      console.log('Invalid form');
    }
  }

}
