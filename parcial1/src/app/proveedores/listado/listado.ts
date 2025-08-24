import { Component } from '@angular/core';

interface Proveedor {
  idProveedor: number;
  nombre: string;
}

@Component({
  selector: 'app-proveedores-listado',
  templateUrl: './listado.html',
  imports: const [CommonModule],
  styleUrls: ['./listado.css'],
  standalone: true,
})
export class ListadoComponent {
  filtro: string = '';
  proveedores: Proveedor[] = [
    { idProveedor: 1, nombre: 'Proveedor A' },
    { idProveedor: 2, nombre: 'Proveedor B' },
    { idProveedor: 3, nombre: 'Proveedor C' },
  ];

  get proveedoresFiltrados(): Proveedor[] {
    if (!this.filtro) return this.proveedores;
    return this.proveedores.filter((p) =>
      p.nombre.toLowerCase().includes(this.filtro.toLowerCase()),
    );
  }
}
