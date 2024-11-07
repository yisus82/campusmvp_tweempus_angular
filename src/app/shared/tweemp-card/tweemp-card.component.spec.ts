import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweempCardComponent } from './tweemp-card.component';

describe('TweempCardComponent', () => {
  let component: TweempCardComponent;
  let fixture: ComponentFixture<TweempCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TweempCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TweempCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
