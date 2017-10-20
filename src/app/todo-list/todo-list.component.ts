import { Component, OnInit } from '@angular/core';

import {DataService} from '../data.service';
import {Todo} from '../todo';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{
  todos: Array<object> = [];
  selectedTodo: Todo;

  constructor(private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllTodos().subscribe(todos => {
      this.todos = todos.data;
    });
  }

  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
  }

  gotoDetail(): void{
    this.router.navigate(['/todo', this.selectedTodo._id]);
  }
}
