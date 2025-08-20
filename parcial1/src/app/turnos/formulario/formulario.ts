import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Turno {
  idTurno: number;
  fecha: string;
  horaInicioAgendamiento: string;
  horaFinAgendamiento: string;
  idProveedor: number;
  idJaula: number | null;
  productos: { idProducto: number; cantidad: number }[];
}

@Component({
  selector: 'app-turnos-formulario',
  templateUrl: './formulario.html',
  styleUrls: ['./formulario.css']
})
export class FormularioComponent implements OnInit {
  turno: Turno = {
    idTurno: 0,
    fecha: '',
    horaInicioAgendamiento: '',
    horaFinAgendamiento: '',
    idProveedor: 0,
    idJaula: null,
    productos: []
  };

  editMode = false;

  proveedores = [
    { idProveedor: 1, nombre: 'Proveedor 1' },
    { idProveedor: 2, nombre: 'Proveedor 2' }
  ];

  jaulas = [
    { idJaula: 1, nombre: 'Jaula 1' },
    { idJaula: 2, nombre: 'Jaula 2' }
  ];

  productosDisponibles = [
    { idProducto: 1, nombre: 'Producto A' },
    { idProducto: 2, nombre: 'Producto B' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      // Aquí cargarías el turno real desde un servicio
      this.turno.idTurno = +id;
      this.turno.fecha = '2025-08-20';
      this.turno.horaInicioAgendamiento = '07:00';
      this.turno.horaFinAgendamiento = '07:30';
      this.turno.idProveedor = 1;
      this.turno.idJaula = 1;
      this.turno.productos = [{ idProducto: 1, cantidad: 10 }];
    }
  }

  agregarProducto() {
    this.turno.productos.push({ idProducto: 0, cantidad: 1 });
  }

  eliminarProducto(index: number) {
    this.turno.productos.splice(index, 1);
  }

  guardar() {
    if (this.editMode) {
      console.log('Turno actualizado:', this.turno);
    } else {
      console.log('Turno creado:', this.turno);
    }
    this.router.navigate(['/turnos']);
  }
}
