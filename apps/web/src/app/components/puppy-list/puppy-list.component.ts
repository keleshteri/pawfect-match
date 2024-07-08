import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Puppy } from '../../interfaces/puppy';
import { PuppyService } from '../../services/puppy.service';
import { FormsModule } from '@angular/forms';
import { PuppyListPagination } from '../../interfaces/puppy-list-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puppy-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './puppy-list.component.html',
  styleUrl: './puppy-list.component.scss',
})
export class PuppyListComponent implements OnInit {
  // puppyService = inject(PuppyService);
  currentPage: number = 1;
  pageSize: number = 10;
  puppies: Puppy[] = [];
  puppiesPagination: PuppyListPagination | null = null;
  breeds: string[] = [];
  sizes: string[] = ['Small', 'Medium', 'Large'];
  genders: string[] = ['Male', 'Female'];
  ages: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  selectedBreed = '';
  selectedSize = '';
  selectedGender = '';
  selectedAge = '';
  searchKeyword = '';

  constructor(
    private puppyService: PuppyService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchAllPuppies();
    this.fetchBreeds();
  }

  fetchAllPuppies() {
    this.puppyService
      .getAllPuppies({
        page: this.currentPage,
        limit: this.pageSize,
      })
      .subscribe({
        next: (pagination) => {
          this.puppiesPagination = pagination;
          this.puppies = pagination.data;
          this.currentPage = pagination.metadata.currentPage;
          this.pageSize = pagination.metadata.pageCount;
        },
        error: (err) => console.error('Failed to get puppies:', err),
      });
  }

  fetchBreeds() {
    this.puppyService.getBreeds().subscribe({
      next: (breeds) => {
        this.breeds = breeds;
      },
      error: (err) => console.error('Failed to get breeds:', err),
    });
  }

  filterPuppies() {
    const filterParams = {
      breed: this.selectedBreed,
      size: this.selectedSize,
      gender: this.selectedGender,
      age: this.selectedAge,
    };
    this.puppyService.getFilteredPuppies(filterParams).subscribe({
      next: (pagination) => {
        this.puppiesPagination = pagination;
        this.puppies = pagination.data;
        this.currentPage = pagination.metadata.currentPage;
        this.pageSize = pagination.metadata.pageCount;
      },
      error: (err) => console.error('Error during filtering:', err),
    });
  }

  onSearch() {
    if (this.searchKeyword) {
      this.puppyService.searchPuppies(this.searchKeyword).subscribe({
        next: (pagination) => {
          this.puppiesPagination = pagination;
          this.puppies = pagination.data;
          this.currentPage = pagination.metadata.currentPage;
          this.pageSize = pagination.metadata.pageCount;
        },
        error: (err) => console.error('Error during search:', err),
      });
    }
  }

  navigateToPuppy(id: number): void {
    this.router.navigate(['/puppies', id]);
  }
}
