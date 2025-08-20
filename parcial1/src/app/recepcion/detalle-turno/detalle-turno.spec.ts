import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTurno } from './detalle-turno';

describe('DetalleTurno', () => {
  let component: DetalleTurno;
  let fixture: ComponentFixture<DetalleTurno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleTurno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleTurno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
