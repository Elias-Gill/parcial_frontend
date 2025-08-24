import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos-listado',
  templateUrl: './listado.html',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  styleUrls: ['./listado.css'],
})
export class ListadoComponent implements OnInit {
  filtro: string = '';
  productos: Producto[] = [];

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.productos = this.storage.getItem<Producto[]>('productos') || [];
  }

  get productosFiltrados(): Producto[] {
    if (!this.filtro) return this.productos;
    return this.productos.filter((p) => p.nombre.toLowerCase().includes(this.filtro.toLowerCase()));
  }
}
