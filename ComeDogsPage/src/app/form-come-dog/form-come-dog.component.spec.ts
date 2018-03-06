import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComeDogComponent } from './form-come-dog.component';

describe('FormComeDogComponent', () => {
  let component: FormComeDogComponent;
  let fixture: ComponentFixture<FormComeDogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComeDogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComeDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
