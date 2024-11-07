import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweempListComponent } from './tweemp-list.component';

describe('TweempListComponent', () => {
  let component: TweempListComponent;
  let fixture: ComponentFixture<TweempListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TweempListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweempListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
