import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Puppy } from '../interfaces/puppy';
import { Observable } from 'rxjs';
import { PuppyListPagination } from '../interfaces/puppy-list-pagination';
import { PaginationParams } from '../interfaces/pagination-params';

@Injectable({
  providedIn: 'root',
})
export class PuppyService {
  private apiUrl = `${environment.apiUrl}/puppies`;
  private breedUrl = `${environment.apiUrl}/breeds`;
  // http = inject(HttpClient);
  constructor(private http: HttpClient) {}

  getAllPuppies(
    pagination?: PaginationParams,
  ): Observable<PuppyListPagination> {
    return this.http.get<PuppyListPagination>(this.apiUrl, {
      params: pagination
        ? {
            page: pagination.page.toString(),
            limit: pagination.limit.toString(),
          }
        : {},
    });
  }

  getFilteredPuppies(
    params: any,
    pagination?: PaginationParams,
  ): Observable<PuppyListPagination> {
    const queryParams = { ...params, ...pagination };
    return this.http.get<PuppyListPagination>(this.apiUrl, {
      params: queryParams,
    });
  }

  getBreeds(): Observable<string[]> {
    return this.http.get<string[]>(this.breedUrl);
  }

  getBreedWithIds(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(
      this.breedUrl + '/ids',
    );
  }

  searchPuppies(
    keyword: string,
    pagination?: PaginationParams,
  ): Observable<PuppyListPagination> {
    const params = { search: keyword, ...pagination };
    return this.http.get<PuppyListPagination>(`${this.apiUrl}/search`, {
      params,
    });
  }

  getPuppyById(id: number): Observable<Puppy> {
    return this.http.get<Puppy>(`${this.apiUrl}/puppy/${id}`);
  }

  submitAdoptionApplication(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/adoption-applications`, data);
  }

  addPuppy(puppy: Puppy): Observable<Puppy> {
    return this.http.post<Puppy>(`${this.apiUrl}/admin/add-puppy`, puppy);
  }

  updatePuppy(id: number, puppy: Puppy): Observable<Puppy> {
    return this.http.patch<Puppy>(
      `${this.apiUrl}/admin/edit-puppy/${id}`,
      puppy,
    );
  }

  deletePuppy(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/delete-puppy/${id}`);
  }
}
