import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTweempComponent } from './create-tweemp.component';

describe('CreateTweempComponent', () => {
  let component: CreateTweempComponent;
  let fixture: ComponentFixture<CreateTweempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTweempComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTweempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
