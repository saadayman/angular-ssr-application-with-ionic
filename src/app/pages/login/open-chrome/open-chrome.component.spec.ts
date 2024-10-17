import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';


import { OpenChromeComponent } from './open-chrome.component';

describe('OpenChromeComponent', () => {
  let component: OpenChromeComponent;
  let fixture: ComponentFixture<OpenChromeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenChromeComponent ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(OpenChromeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
