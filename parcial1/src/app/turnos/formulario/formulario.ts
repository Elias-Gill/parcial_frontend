import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { Turno, TurnoDetalle } from '../../models/turno';
import { Proveedor } from '../../models/proveedor';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-turnos-formulario',
  templateUrl: './formulario.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./formulario.css'],
})
export class TurnosFormularioComponent implements OnInit {
  @Output() turnoCreado = new EventEmitter<Turno>();

  proveedores: Proveedor[] = [];
  productos: Producto[] = [];
  turnos: Turno[] = [];

  productosFiltrados: Producto[] = [];
  cantidades: Record<number, number> = {}; // Para bindear cantidades por producto
  filtroProducto: string = '';

  // Estados para mensajes estéticos
  mensajeError = '';
  mostrarError = false;

  ngOnInit() {
    this.proveedores = this.storage.getItem<Proveedor[]>('proveedores') || [];
    this.productos = this.storage.getItem<Producto[]>('productos') || [];
    this.turnos = this.storage.getItem<Turno[]>('turnos') || [];
  }

  idProveedor: number | null = null;
  fecha: string = new Date().toISOString().split('T')[0];
  horaInicio: string = '';
  horaFin: string = '';
  productosSeleccionados: TurnoDetalle[] = [];

  constructor(private storage: StorageService) {}

  filtrarProductos() {
    if (!this.idProveedor) {
      this.productosFiltrados = [];
      return;
    }

    const proveedorId = Number(this.idProveedor); // <-- convertimos a número

    this.productosFiltrados = this.productos.filter(
      (p) =>
        p.idProveedor === proveedorId &&
        (!this.filtroProducto ||
          p.nombre.toLowerCase().includes(this.filtroProducto.toLowerCase())),
    );
  }

  agregarProducto(producto: Producto) {
    const cantidad = this.cantidades[producto.idProducto];
    if (!cantidad || cantidad <= 0) {
      this.mostrarMensajeError('Ingrese una cantidad válida');
      return;
    }

    // Evitar duplicados
    const index = this.productosSeleccionados.findIndex(
      (p) => p.idProducto === producto.idProducto,
    );
    if (index >= 0) {
      this.productosSeleccionados[index].cantidad += cantidad;
    } else {
      this.productosSeleccionados.push({
        idProducto: producto.idProducto,
        nombreProducto: producto.nombre,
        cantidad,
      });
    }

    this.cantidades[producto.idProducto] = 0; // reset input
    this.ocultarMensajeError(); // Ocultar error si estaba visible
  }

  eliminarProducto(idProducto: number) {
    this.productosSeleccionados = this.productosSeleccionados.filter(
      (p) => p.idProducto !== idProducto,
    );
  }

  guardarTurno() {
    if (
      !this.idProveedor ||
      !this.horaInicio ||
      !this.horaFin ||
      this.productosSeleccionados.length === 0
    ) {
      this.mostrarMensajeError('Complete todos los campos');
      return;
    }

    const nuevoTurno: Turno = {
      idTurno: Date.now(),
      fecha: this.fecha,
      horaInicioAgendamiento: this.horaInicio,
      horaFinAgendamiento: this.horaFin,
      idProveedor: this.idProveedor,
      idJaula: null,
      productos: this.productosSeleccionados,
    };

    this.turnos.push(nuevoTurno);
    this.storage.setItem('turnos', this.turnos);
    this.turnoCreado.emit(nuevoTurno);
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.idProveedor = null;
    this.horaInicio = '';
    this.horaFin = '';
    this.productosSeleccionados = [];
    this.cantidades = {};
    this.productosFiltrados = [];
    this.filtroProducto = '';
    this.mostrarError = false;
    this.mensajeError = '';
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
}
