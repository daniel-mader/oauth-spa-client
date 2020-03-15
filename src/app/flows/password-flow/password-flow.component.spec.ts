import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFlowComponent } from './password-flow.component';

describe('PasswordFlowComponent', () => {
  let component: PasswordFlowComponent;
  let fixture: ComponentFixture<PasswordFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
