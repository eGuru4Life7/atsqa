import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteDeveloperComponent } from './invite-developer.component';

describe('InviteDeveloperComponent', () => {
  let component: InviteDeveloperComponent;
  let fixture: ComponentFixture<InviteDeveloperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteDeveloperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
