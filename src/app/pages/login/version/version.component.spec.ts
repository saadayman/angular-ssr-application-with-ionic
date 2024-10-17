import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';


import { VersionComponent } from './version.component';
import PackageInfo from '../../../../../package.json';

describe('LoginVersionComponent', () => {
  let component: VersionComponent;
  let fixture: ComponentFixture<VersionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionComponent ],
      imports: [()]
    }).compileComponents();

    fixture = TestBed.createComponent(VersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('version should be equal version in package.json', () => {
    console.log(component.Medical_Version)
    console.log('**********', PackageInfo.version)
    expect(component.Medical_Version).not.toEqual(PackageInfo.version);
  });
});
