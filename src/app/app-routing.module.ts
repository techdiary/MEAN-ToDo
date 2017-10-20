import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TodoListComponent} from './todo-list/todo-list.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TodoFormComponent} from "./todo-form/todo-form.component";
import {TodoDetailComponent} from "./todo-detail/todo-detail.component";


const appRoutes: Routes = [
  {path: '', component: TodoListComponent, pathMatch: 'full'},
  {path: 'todo', component: TodoListComponent},
  {path: 'todo/:id', component: TodoDetailComponent},
  {path: 'todo/new', component: TodoFormComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
