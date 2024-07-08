import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss',
})
export class ThankYouComponent {}
