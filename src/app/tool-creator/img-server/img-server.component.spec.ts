import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgServerComponent } from './img-server.component';

describe('RemoveHotspotComponent', () => {
  let component: ImgServerComponent;
  let fixture: ComponentFixture<ImgServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
