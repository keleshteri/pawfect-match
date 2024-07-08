import { Component } from '@angular/core';
import { Puppy } from '../../interfaces/puppy';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PuppyService } from '../../services/puppy.service';
import { PuppyListPagination } from '../../interfaces/puppy-list-pagination';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-puppies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-puppies.component.html',
  styleUrl: './manage-puppies.component.scss',
})
export class ManagePuppiesComponent {
  puppies: Puppy[] = [];
  puppiesPagination: PuppyListPagination | null = null;
  puppyForm: FormGroup;
  isEdit = false;
  currentPuppyId: number | null = null;

  constructor(
    private puppyService: PuppyService,
    private router: Router,
  ) {
    this.puppyForm = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl(0, [Validators.required, Validators.min(0)]),
      gender: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      breedId: new FormControl(0, Validators.min(1)),
      photoUrl: new FormControl(''),
      traitIds: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.loadPuppies();
  }

  loadPuppies() {
    this.puppyService
      .getAllPuppies()
      .subscribe((pagination: PuppyListPagination) => {
        this.puppiesPagination = pagination;
        this.puppies = pagination.data;
      });
  }

  onSubmit() {
    const puppy = this.puppyForm.value;
    if (this.isEdit && this.currentPuppyId) {
      this.puppyService
        .updatePuppy(this.currentPuppyId, puppy)
        .subscribe(() => {
          this.loadPuppies();
          this.resetForm();
        });
    } else {
      this.puppyService.addPuppy(puppy).subscribe(() => {
        this.loadPuppies();
        this.resetForm();
      });
    }
  }

  onEdit(puppy: Puppy) {
    this.puppyForm.setValue({
      name: puppy.name,
      age: puppy.age,
      gender: puppy.gender,
      size: puppy.size,
      breedId: puppy.breedId || 0,
      photoUrl: puppy.photoUrl || '',
      traitIds: [],
    });
    this.currentPuppyId = puppy.id;
    this.isEdit = true;
    this.router.navigate(['admin/edit-puppy', puppy.id]);
  }

  onDelete(id: number) {
    this.puppyService.deletePuppy(id).subscribe(() => {
      this.loadPuppies();
    });
  }

  resetForm() {
    this.puppyForm.reset();
    this.isEdit = false;
    this.currentPuppyId = null;
  }
}
