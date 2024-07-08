import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePuppiesComponent } from './manage-puppies.component';

describe('ManagePuppiesComponent', () => {
  let component: ManagePuppiesComponent;
  let fixture: ComponentFixture<ManagePuppiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePuppiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePuppiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
