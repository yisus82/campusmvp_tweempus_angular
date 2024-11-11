import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTweempsComponent } from './my-tweemps.component';

describe('MyTweempsComponent', () => {
  let component: MyTweempsComponent;
  let fixture: ComponentFixture<MyTweempsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTweempsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTweempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
