import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Puppy } from '../../interfaces/puppy';
import { PuppyService } from '../../services/puppy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puppy-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puppy-details.component.html',
  styleUrl: './puppy-details.component.scss',
})
export class PuppyDetailsComponent implements OnInit {
  puppy$: Observable<Puppy> | undefined;

  constructor(
    private puppyService: PuppyService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.puppy$ = this.puppyService.getPuppyById(+id);
  }

  navigateToForm(id: number) {
    this.router.navigate(['/adopt', id]);
  }
}
