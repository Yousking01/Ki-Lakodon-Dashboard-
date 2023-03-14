import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceurComponent } from './annonceur.component';

describe('AnnonceurComponent', () => {
  let component: AnnonceurComponent;
  let fixture: ComponentFixture<AnnonceurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnonceurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
