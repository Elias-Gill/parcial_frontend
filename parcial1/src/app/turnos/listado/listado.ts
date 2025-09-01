import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { calcularEstadoTurno, EstadoTurno, Turno } from '../../models/turno';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TurnosFormularioComponent } from '../formulario/formulario';
import { TurnoDetalleDialogComponent } from '../modal/modal';
import { Proveedor } from '../../models/proveedor';
import { JaulasModule } from '../../jaulas/jaulas-module';
import { Jaula } from '../../models/jaula';

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
  jaulas: Jaula[] = [];
  mostrarFormulario = false;
  mostrarError = false;
  mensajeError = '';
  proveedores: Proveedor[] = [];

  constructor(
    private storage: StorageService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.cargarTurnos();
    this.cargarJaulas();
    this.cargarProveedores();
  }

  cargarTurnos() {
    this.turnos = this.storage.getItem<Turno[]>('turnos') || [];
    this.turnos = this.turnos.filter((t) => t.fecha === this.fechaSeleccionada);
    this.turnos.sort((a, b) => a.horaInicioAgendamiento.localeCompare(b.horaInicioAgendamiento));
  }

  cargarProveedores() {
    this.proveedores = this.storage.getItem<Proveedor[]>('proveedores') || [];
  }

  cargarJaulas() {
    this.jaulas = this.storage.getItem<Jaula[]>('jaulas') || [];
  }

  estado(turno: Turno): EstadoTurno {
    return calcularEstadoTurno(turno);
  }

  get turnosPendientes(): number {
    return this.turnos.filter((t) => this.estado(t) === 'pendiente').length;
  }

  get turnosEnRecepcion(): number {
    return this.turnos.filter((t) => this.estado(t) === 'en recepcion').length;
  }

  get turnosFinalizados(): number {
    return this.turnos.filter((t) => this.estado(t) === 'completado').length;
  }

  getEstadoBadgeClass(turno: Turno): string {
    const estadoTurno = this.estado(turno);
    switch (estadoTurno) {
      case 'pendiente':
        return 'badge badge-warning';
      case 'en recepcion':
        return 'badge badge-primary';
      case 'completado':
        return 'badge badge-success';
      default:
        return 'badge badge-secondary';
    }
  }

  getEstadoDotClass(turno: Turno): string {
    const estadoTurno = this.estado(turno);
    switch (estadoTurno) {
      case 'pendiente':
        return 'w-2 h-2 bg-yellow-400 rounded-full';
      case 'en recepcion':
        return 'w-2 h-2 bg-blue-400 rounded-full';
      case 'completado':
        return 'w-2 h-2 bg-green-400 rounded-full';
      default:
        return 'w-2 h-2 bg-gray-400 rounded-full';
    }
  }

  iniciarRecepcion(turno: Turno) {
    const jaulaLibre = this.jaulas.find((j) => !j.enUso);
    if (!jaulaLibre) {
      this.mostrarMensajeError('No hay jaulas disponibles');
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
      this.mostrarMensajeError('La recepción no ha iniciado.');
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
    this.dialog.open(TurnoDetalleDialogComponent, {
      width: '400px',
      data: turno,
    });
  }

  onTurnoCreado(nuevoTurno: Turno) {
    this.turnos.push(nuevoTurno);
    this.guardarCambios();
    this.mostrarFormulario = false;
  }

  mostrarMensajeError(mensaje: string) {
    this.mensajeError = mensaje;
    this.mostrarError = true;
    setTimeout(() => {
      this.ocultarMensajeError();
    }, 5000);
  }

  ocultarMensajeError() {
    this.mostrarError = false;
    this.mensajeError = '';
  }

  getNombreProveedor(idProveedor: any): string {
    const idNum = Number(idProveedor); // Convertir siempre a número
    const proveedor = this.proveedores.find((p) => Number(p.idProveedor) === idNum);
    return proveedor ? proveedor.nombre : `Proveedor #${idNum}`;
  }
}
