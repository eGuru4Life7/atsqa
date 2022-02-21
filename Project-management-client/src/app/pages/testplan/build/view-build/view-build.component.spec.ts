import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBuildComponent } from './view-build.component';

describe('ViewBuildComponent', () => {
  let component: ViewBuildComponent;
  let fixture: ComponentFixture<ViewBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
