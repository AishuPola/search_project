import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './search/search.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  searchUser(searchTerm: string) {
    return this.http.get<Book[]>(
      `https://669a42869ba098ed61fef725.mockapi.io/books?search=${searchTerm}`
    );
  }
}
