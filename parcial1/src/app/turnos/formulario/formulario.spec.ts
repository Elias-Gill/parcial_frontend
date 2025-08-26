import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TurnosFormularioComponent } from './formulario';

describe('FormularioComponent', () => {
  let component: TurnosFormularioComponent;
  let fixture: ComponentFixture<TurnosFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TurnosFormularioComponent],
      imports: [FormsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TurnosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });
});
