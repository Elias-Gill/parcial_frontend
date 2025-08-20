import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface ProductoDetalle {
  idProducto: number;
  nombre: string;
  cantidad: number;
}

interface Turno {
  idTurno: number;
  fecha: string;
  idProveedor: number;
  idJaula: number | null;
  horaInicioRecepcion?: string;
  horaFinRecepcion?: string;
  productos: ProductoDetalle[];
}

@Component({
  selector: 'app-detalle-turno',
  templateUrl: './detalle-turno.html',
  styleUrls: ['./detalle-turno.css'],
})
export class DetalleTurnoComponent implements OnInit {
  turno: Turno = {
    idTurno: 0,
    fecha: '',
    idProveedor: 0,
    idJaula: null,
    productos: [],
  };

  jaulasDisponibles = [
    { idJaula: 1, nombre: 'Jaula 1' },
    { idJaula: 3, nombre: 'Jaula 3' },
  ];

  jaulaSeleccionada: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Aquí se cargaría el turno real desde un servicio
      this.turno = {
        idTurno: +id,
        fecha: new Date().toISOString().split('T')[0],
        idProveedor: 1,
        idJaula: null,
        productos: [
          { idProducto: 1, nombre: 'Producto A', cantidad: 10 },
          { idProducto: 2, nombre: 'Producto B', cantidad: 5 },
        ],
      };
    }
  }

  iniciarRecepcion() {
    if (!this.jaulaSeleccionada) return alert('Seleccione una jaula disponible');
    this.turno.idJaula = this.jaulaSeleccionada;
    this.turno.horaInicioRecepcion = new Date().toLocaleTimeString();
    alert(`Recepción iniciada en jaula ${this.jaulaSeleccionada}`);
  }

  finalizarRecepcion() {
    if (!this.turno.horaInicioRecepcion) return alert('Primero debe iniciar la recepción');
    this.turno.horaFinRecepcion = new Date().toLocaleTimeString();
    this.turno.idJaula = null;
    this.jaulaSeleccionada = null;
    alert('Recepción finalizada');
    this.router.navigate(['/recepcion']);
  }
}
