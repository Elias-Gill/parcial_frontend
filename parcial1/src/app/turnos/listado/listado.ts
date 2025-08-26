import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { calcularEstadoTurno, EstadoTurno, Turno } from '../../models/turno';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TurnosFormularioComponent } from '../formulario/formulario';

@Component({
  selector: 'app-turnos-listado',
  templateUrl: './listado.html',
  styleUrls: ['./listado.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TurnosFormularioComponent],
})
export class TurnosListadoComponent implements OnInit {
  turnos: Turno[] = [];
  fechaSeleccionada: string = new Date().toISOString().split('T')[0]; // Hoy
  jaulas: { idJaula: number; nombre: string; enUso: boolean }[] = [];
  mostrarFormulario = false;

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.cargarTurnos();
    this.cargarJaulas();
  }

  cargarTurnos() {
    this.turnos = this.storage.getItem<Turno[]>('turnos') || [];
    this.turnos = this.turnos.filter((t) => t.fecha === this.fechaSeleccionada);
    this.turnos.sort((a, b) => a.horaInicioAgendamiento.localeCompare(b.horaInicioAgendamiento));
  }

  cargarJaulas() {
    this.jaulas = this.storage.getItem<any[]>('jaulas') || [];
  }

  estado(turno: Turno): EstadoTurno {
    return calcularEstadoTurno(turno);
  }

  iniciarRecepcion(turno: Turno) {
    const jaulaLibre = this.jaulas.find((j) => !j.enUso);
    if (!jaulaLibre) {
      alert('No hay jaulas disponibles');
      return;
    }

    turno.idJaula = jaulaLibre.idJaula;
    turno.horaInicioRecepcion = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    jaulaLibre.enUso = true;

    this.guardarCambios();
  }

  finalizarRecepcion(turno: Turno) {
    if (!turno.horaInicioRecepcion) {
      alert('La recepción no ha iniciado.');
      return;
    }

    turno.horaFinRecepcion = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const jaula = this.jaulas.find((j) => j.idJaula === turno.idJaula);
    if (jaula) jaula.enUso = false;

    this.guardarCambios();
  }

  guardarCambios() {
    this.storage.setItem('turnos', this.turnos);
    this.storage.setItem('jaulas', this.jaulas);
    this.cargarTurnos();
  }

  verDetalles(turno: Turno) {
    alert(
      'Detalles:\n' + turno.productos.map((p) => `${p.nombreProducto}: ${p.cantidad}`).join('\n'),
    );
  }

  onTurnoCreado(nuevoTurno: Turno) {
    this.turnos.push(nuevoTurno);
    this.guardarCambios();
    this.mostrarFormulario = false;
  }
}
