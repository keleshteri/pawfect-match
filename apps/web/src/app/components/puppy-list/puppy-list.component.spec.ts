import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuppyListComponent } from './puppy-list.component';

describe('PuppyListComponent', () => {
  let component: PuppyListComponent;
  let fixture: ComponentFixture<PuppyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuppyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuppyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
