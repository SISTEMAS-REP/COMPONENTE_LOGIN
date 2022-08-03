import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioNuevoUsuarioComponent } from './formulario-nuevo-usuario.component';

describe('FormularioNuevoUsuarioComponent', () => {
  let component: FormularioNuevoUsuarioComponent;
  let fixture: ComponentFixture<FormularioNuevoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioNuevoUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioNuevoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
