import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';


import { NixLogoComponent } from './nix-logo.component';

describe('NixLogoComponent', () => {
  let component: NixLogoComponent;
  let fixture: ComponentFixture<NixLogoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NixLogoComponent ],
      imports: [()]
    }).compileComponents();

    fixture = TestBed.createComponent(NixLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
