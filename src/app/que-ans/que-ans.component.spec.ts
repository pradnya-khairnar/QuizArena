import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueAnsComponent } from './que-ans.component';

describe('QueAnsComponent', () => {
  let component: QueAnsComponent;
  let fixture: ComponentFixture<QueAnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueAnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
