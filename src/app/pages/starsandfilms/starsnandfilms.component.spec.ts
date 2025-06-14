import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsnandfilmsComponent } from './starsnandfilms.component';

describe('StarsnandfilmsComponent', () => {
  let component: StarsnandfilmsComponent;
  let fixture: ComponentFixture<StarsnandfilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarsnandfilmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarsnandfilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
