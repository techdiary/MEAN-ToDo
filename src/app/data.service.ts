import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import { Observable, Subscription} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {MongoResult} from './dataInterface/MongoResult';
import 'rxjs/add/operator/toPromise';
import {Todo} from "./todo";

@Injectable()
export class DataService {

  constructor( private http: Http) { }

  getAllTodos(): Observable<MongoResult> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: headers});

    return this.http.get('/api/todos', options)
      .timeout(360000)
      .map(response => response.json())
      .catch( (error: any) => {
        return Observable.throw(error.toString() || 'server error');
      });
  }

  getTodo(id): Observable<MongoResult> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: headers});

    const url = `/api/todo/${id}`;
    return this.http.get(url, options)
      .timeout(360000)
      .map(response => response.json())
      .catch( (error: any) => {
        return Observable.throw(error.toString() || 'server error');
      });
  }

  createTodo(body: Object): Observable<MongoResult> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: headers});

    return this.http.post('/api/todo', body, options)
      .timeout(360000)
      .map( res => res.json())
      .catch( (error: any) => {
        return Observable.throw(error.toString() || 'server error');
    });
  }

}
