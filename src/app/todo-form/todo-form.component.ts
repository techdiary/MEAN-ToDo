import { Component, OnInit } from '@angular/core';

import {Todo} from '../todo';
import {DataService} from '../data.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  model = new Todo('Enter title', 'Enter Description');

  submitted = false;

  result: boolean;

  onSubmit() {
    this.submitted = true;
    this.dataService.createTodo(this.model).subscribe( result => {
      this.result = result.success;
    });
  }
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  get diagnostic(){
    return JSON.stringify(this.model);
  }

}
