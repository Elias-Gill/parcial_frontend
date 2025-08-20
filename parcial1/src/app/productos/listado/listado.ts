import { Component } from '@angular/core';

interface Producto {
  idProducto: number;
  nombre: string;
}

@Component({
  selector: 'app-productos-listado',
  templateUrl: './listado.html',
  styleUrls: ['./listado.css']
})
export class ListadoComponent {
  filtro: string = '';
  productos: Producto[] = [
    { idProducto: 1, nombre: 'Producto X' },
    { idProducto: 2, nombre: 'Producto Y' },
    { idProducto: 3, nombre: 'Producto Z' }
  ];

  get productosFiltrados(): Producto[] {
    if (!this.filtro) return this.productos;
    return this.productos.filter(p =>
      p.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
