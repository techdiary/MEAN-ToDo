import {Component, Input, OnInit} from '@angular/core';

import {ActivatedRoute, ParamMap} from '@angular/router';
import { Location} from '@angular/common';

import {Todo} from '../todo';
import {DataService} from '../data.service';

import 'rxjs/add/operator/switchMap';



@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

   @Input() todo;

  constructor(
    private todoService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('_id');

    // this.todo = this.todoService.getTodo(id);
   this.route.paramMap
     .switchMap((params: ParamMap) => this.todoService.getTodo(params.get('id')))
     .subscribe(todo => this.todo = todo.data);
  }

}
