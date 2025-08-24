// src/app/recepcion/detalle-turno.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Turno } from '../../models/turno';
import { Producto } from '../../models/producto';

interface Jaula {
  idJaula: number;
  nombre: string;
}

@Component({
  selector: 'app-detalle-turno',
  templateUrl: './detalle-turno.html',
  styleUrls: ['./detalle-turno.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
})
export class DetalleTurnoComponent implements OnInit {
  turno: Turno = {
    idTurno: 0,
    fecha: '',
    horaInicioAgendamiento: '',
    horaFinAgendamiento: '',
    idProveedor: 0,
    idJaula: null,
    productos: [],
  };

  jaulasDisponibles: Jaula[] = [];
  productos: Producto[] = [];
  jaulaSeleccionada: number | null = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private storage: StorageService,
  ) {}

  ngOnInit() {
    this.jaulasDisponibles = this.storage.getItem<Jaula[]>('jaulas') || [];
    this.productos = this.storage.getItem<Producto[]>('productos') || [];

    const turnos = this.storage.getItem<Turno[]>('turnos') || [];
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const t = turnos.find((turno) => turno.idTurno === +id);
      if (t) this.turno = { ...t };
    }
  }

  iniciarRecepcion() {
    if (!this.jaulaSeleccionada) return alert('Seleccione una jaula disponible');
    this.turno.idJaula = this.jaulaSeleccionada;
    this.turno.horaInicioAgendamiento = new Date().toLocaleTimeString();
    this.guardarTurno();
    alert(`Recepción iniciada en jaula ${this.jaulaSeleccionada}`);
  }

  finalizarRecepcion() {
    if (!this.turno.horaInicioAgendamiento) return alert('Primero debe iniciar la recepción');
    this.turno.horaFinAgendamiento = new Date().toLocaleTimeString();
    this.turno.idJaula = null;
    this.jaulaSeleccionada = null;
    this.guardarTurno();
    alert('Recepción finalizada');
    this.router.navigate(['/recepcion']);
  }

  private guardarTurno() {
    const turnos = this.storage.getItem<Turno[]>('turnos') || [];
    const index = turnos.findIndex((t) => t.idTurno === this.turno.idTurno);
    if (index !== -1) {
      turnos[index] = { ...this.turno };
    } else {
      turnos.push({ ...this.turno });
    }
    this.storage.setItem('turnos', turnos);
  }

  nombreProducto(idProducto: number): string {
    const p = this.productos.find((prod) => prod.idProducto === idProducto);
    return p ? p.nombre : 'Desconocido';
  }
}
