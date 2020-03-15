import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCodePkceFlowComponent } from './auth-code-pkce-flow.component';

describe('AuthCodePkceFlowComponent', () => {
  let component: AuthCodePkceFlowComponent;
  let fixture: ComponentFixture<AuthCodePkceFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCodePkceFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCodePkceFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
