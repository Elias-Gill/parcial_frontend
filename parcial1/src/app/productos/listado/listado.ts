import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Producto {
  idProducto: number;
  nombre: string;
}

@Component({
  selector: 'app-productos-listado',
  templateUrl: './listado.html',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  styleUrls: ['./listado.css'],
})
export class ListadoComponent {
  filtro: string = '';
  productos: Producto[] = [
    { idProducto: 1, nombre: 'Producto X' },
    { idProducto: 2, nombre: 'Producto Y' },
    { idProducto: 3, nombre: 'Producto Z' },
  ];

  get productosFiltrados(): Producto[] {
    if (!this.filtro) return this.productos;
    return this.productos.filter((p) => p.nombre.toLowerCase().includes(this.filtro.toLowerCase()));
  }
}
