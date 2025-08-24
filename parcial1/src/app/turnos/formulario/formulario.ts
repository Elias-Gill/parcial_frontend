import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Turno } from '../../models/turno';
import { Producto } from '../../models/producto';

interface Proveedor { idProveedor: number; nombre: string; }
interface Jaula { idJaula: number; nombre: string; }

@Component({
  selector: 'app-turnos-formulario',
  templateUrl: './formulario.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./formulario.css'],
})
export class FormularioComponent implements OnInit {
  turno: Turno = {
    idTurno: 0,
    fecha: '',
    horaInicioAgendamiento: '',
    horaFinAgendamiento: '',
    idProveedor: 0,
    idJaula: null,
    productos: [], // array de ProductoDetalle
  };

  editMode = false;

  proveedores: Proveedor[] = [];
  jaulas: Jaula[] = [];
  productosDisponibles: Producto[] = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.proveedores = this.storage.getItem<Proveedor[]>('proveedores') || [];
    this.jaulas = this.storage.getItem<Jaula[]>('jaulas') || [];
    this.productosDisponibles = this.storage.getItem<Producto[]>('productos') || [];

    const turnos = this.storage.getItem<Turno[]>('turnos') || [];

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      const turnoExistente = turnos.find(t => t.idTurno === +id);
      if (turnoExistente) {
        this.turno = { ...turnoExistente };
      }
    }
  }

  agregarProducto() {
    if (!this.turno.productos) this.turno.productos = [];
    // esto ya es ProductoDetalle, no Producto
    this.turno.productos.push({ idProducto: 0, cantidad: 1 });
  }

  eliminarProducto(index: number) {
    this.turno.productos?.splice(index, 1);
  }

  guardar() {
    const turnos = this.storage.getItem<Turno[]>('turnos') || [];

    if (this.editMode) {
      const index = turnos.findIndex(t => t.idTurno === this.turno.idTurno);
      if (index !== -1) turnos[index] = { ...this.turno };
    } else {
      this.turno.idTurno = Date.now();
      turnos.push({ ...this.turno });
    }

    this.storage.setItem('turnos', turnos);
    this.router.navigate(['/turnos']);
  }
}
