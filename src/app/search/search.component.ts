import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, catchError, of } from 'rxjs';
import { UserService } from '../user.service';
export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  publicationDate: string;
  status: string;
  posterUrl: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchForm!: FormGroup;
  users: Book[] = [];
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.searchForm = this.fb.group({
      search: '',
    });
  }

  ngOnInit() {
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(300),
        switchMap((searchTerm) => this.userService.searchUser(searchTerm))
      )
      .subscribe((data) => {
        console.log(data);
        this.users = data;
      });
  }
  SearchUser() {}
}
