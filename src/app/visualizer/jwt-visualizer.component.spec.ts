import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtVisualizerComponent } from './jwt-visualizer.component';

describe('JwtVisualizerComponent', () => {
  let component: JwtVisualizerComponent;
  let fixture: ComponentFixture<JwtVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JwtVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JwtVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
