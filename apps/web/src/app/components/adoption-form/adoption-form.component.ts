import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Puppy } from '../../interfaces/puppy';
import { PuppyService } from '../../services/puppy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * Component for the adoption form
 */
@Component({
  selector: 'app-adoption-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.scss',
})
export class AdoptionFormComponent {
  puppy$: Observable<Puppy> | undefined;
  adoptionForm!: FormGroup;
  constructor(
    private puppyService: PuppyService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.adoptionForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      // password: new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(8),
      // ]),
      // preferredBreedId: new FormControl(null),
      // preferredAgeRange: new FormControl(''),
      hasOtherPets: new FormControl(false),
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.puppy$ = this.puppyService.getPuppyById(+id);
  }

  onSubmit(): void {
    console.log('Form Data:', this.adoptionForm.value);
    console.log('Form Valid:', this.adoptionForm.valid);
    console.log('Form Errors:', this.adoptionForm.errors);
    if (this.adoptionForm.valid) {
      const applicationData = {
        ...this.adoptionForm.value,
        puppyId: this.route.snapshot.params['id'],
        applicationDate: new Date().toISOString(),
        status: 'PENDING',
      };

      this.puppyService.submitAdoptionApplication(applicationData).subscribe({
        next: (res) => {
          console.log('Application submitted successfully', res);
          this.router.navigate(['/thank-you']);
        },
        error: (err) => {
          console.error('Failed to submit application', err);
        },
      });
    } else {
      // Log detailed error information
      Object.keys(this.adoptionForm.controls).forEach((key) => {
        const controlErrors = this.adoptionForm.get(key)!.errors;
        if (controlErrors) {
          Object.keys(controlErrors).forEach((errorKey) => {
            console.error(
              `Error in ${key}: ${errorKey}, errorValue:`,
              controlErrors[errorKey],
            );
          });
        }
      });
    }
  }
}
