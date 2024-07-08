import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuppyFormComponent } from './puppy-form.component';

describe('PuppyFormComponent', () => {
  let component: PuppyFormComponent;
  let fixture: ComponentFixture<PuppyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuppyFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuppyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
