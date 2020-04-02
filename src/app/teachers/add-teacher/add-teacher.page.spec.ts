import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTeacherPage } from './add-teacher.page';

describe('AddTeacherPage', () => {
  let component: AddTeacherPage;
  let fixture: ComponentFixture<AddTeacherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTeacherPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTeacherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
