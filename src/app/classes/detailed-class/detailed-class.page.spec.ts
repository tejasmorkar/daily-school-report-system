import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailedClassPage } from './detailed-class.page';

describe('DetailedClassPage', () => {
  let component: DetailedClassPage;
  let fixture: ComponentFixture<DetailedClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedClassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailedClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
