import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnoRegistradoPage } from './alumno-registrado.page';

describe('AlumnoRegistradoPage', () => {
  let component: AlumnoRegistradoPage;
  let fixture: ComponentFixture<AlumnoRegistradoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AlumnoRegistradoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
