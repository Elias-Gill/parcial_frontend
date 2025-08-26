import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Proveedor } from '../../models/proveedor';

@Component({
  selector: 'app-proveedores-listado',
  templateUrl: './listado.html',
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./listado.css'],
  standalone: true,
})
export class ListadoComponent implements OnInit {
  filtro: string = '';
  proveedores: Proveedor[] = [];

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.proveedores = this.storage.getItem<Proveedor[]>('proveedores') || [
      { idProveedor: 1, nombre: 'Proveedor A' },
      { idProveedor: 2, nombre: 'Proveedor B' },
      { idProveedor: 3, nombre: 'Proveedor C' },
    ];
    this.storage.setItem('proveedores', this.proveedores);
  }

  get proveedoresFiltrados(): Proveedor[] {
    if (!this.filtro) return this.proveedores;
    return this.proveedores.filter((p) =>
      p.nombre.toLowerCase().includes(this.filtro.toLowerCase()),
    );
  }

  eliminarProveedor(id: number) {
    if (!confirm('¿Seguro que querés eliminar este proveedor?')) return;

    this.proveedores = this.proveedores.filter((p) => p.idProveedor !== id);
    this.storage.setItem('proveedores', this.proveedores);
  }
}
