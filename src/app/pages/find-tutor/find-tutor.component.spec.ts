import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTutorComponent } from './find-tutor.component';

describe('FindTutorComponent', () => {
  let component: FindTutorComponent;
  let fixture: ComponentFixture<FindTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindTutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
