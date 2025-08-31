import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Producto } from '../../models/producto';
import { Proveedor } from '../../models/proveedor';
import { ConfirmDialogProductoComponent } from '../modal/modal';

@Component({
  selector: 'app-productos-listado',
  templateUrl: './listado.html',
  imports: [CommonModule, FormsModule, RouterModule, ConfirmDialogProductoComponent],
  standalone: true,
  styleUrls: ['./listado.css'],
})
export class ListadoComponent implements OnInit {
  filtro: string = '';
  productos: Producto[] = [];
  proveedores: Proveedor[] = [];
  showConfirmDialog = false;
  productoAEliminar: number | null = null;

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.productos = this.storage.getItem<Producto[]>('productos') || [];
    this.proveedores = this.storage.getItem<Proveedor[]>('proveedores') || [];
  }

  get productosFiltrados(): Producto[] {
    if (!this.filtro) return this.productos;
    return this.productos.filter((p) => p.nombre.toLowerCase().includes(this.filtro.toLowerCase()));
  }

  getProveedorNombre(id?: number): string {
    const prov = this.proveedores.find(p => p.idProveedor === id);
    return prov ? prov.nombre : '';
  }

  eliminarProducto(id: number) {
    this.productoAEliminar = id;
    this.showConfirmDialog = true;
  }

  onConfirmDelete() {
    if (this.productoAEliminar !== null) {
      this.productos = this.productos.filter(p => p.idProducto !== this.productoAEliminar);
      this.storage.setItem<Producto[]>('productos', this.productos);
    }
    this.showConfirmDialog = false;
    this.productoAEliminar = null;
  }

  onCancelDelete() {
    this.showConfirmDialog = false;
    this.productoAEliminar = null;
  }
}
