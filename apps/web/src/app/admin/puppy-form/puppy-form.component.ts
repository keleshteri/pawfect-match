import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PuppyService } from '../../services/puppy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puppy-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './puppy-form.component.html',
  styleUrl: './puppy-form.component.scss',
})
export class PuppyFormComponent {
  puppyForm: FormGroup;
  isEdit = false;
  currentPuppyId: number | null = null;
  breeds: any[] = [];

  constructor(
    private puppyService: PuppyService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.puppyForm = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl(0, [Validators.required, Validators.min(0)]),
      gender: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      breedId: new FormControl(null),
      photoUrl: new FormControl(''),
      traitIds: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.currentPuppyId = +params['id'];
        if (this.currentPuppyId !== null) {
          this.loadPuppy(this.currentPuppyId);
        }
      }
    });
    this.fetchBreeds();
  }

  loadPuppy(id: number) {
    this.puppyService.getPuppyById(id).subscribe((puppy) => {
      this.puppyForm.patchValue(puppy);
    });
  }

  fetchBreeds() {
    this.puppyService.getBreedWithIds().subscribe({
      next: (breeds) => {
        this.breeds = breeds;
      },
      error: (err) => console.error('Failed to get breeds:', err),
    });
  }

  onSubmit() {
    if (this.puppyForm.valid) {
      const puppyData = this.puppyForm.value;
      if (this.isEdit) {
        this.puppyService
          .updatePuppy(this.currentPuppyId!, puppyData)
          .subscribe({
            next: () => this.router.navigate(['/admin/manage-puppies']),
            error: (error) => console.error('Error updating puppy:', error),
          });
      } else {
        this.puppyService.addPuppy(puppyData).subscribe({
          next: () => this.router.navigate(['/admin/manage-puppies']),
          error: (error) => console.error('Error adding puppy:', error),
        });
      }
    }
  }
}
