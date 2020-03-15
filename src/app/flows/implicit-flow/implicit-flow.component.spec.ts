import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplicitFlowComponent } from './implicit-flow.component';

describe('ImplicitFlowComponent', () => {
  let component: ImplicitFlowComponent;
  let fixture: ComponentFixture<ImplicitFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImplicitFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplicitFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
