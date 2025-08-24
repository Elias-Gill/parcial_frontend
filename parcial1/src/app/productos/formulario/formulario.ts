import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos-formulario',
  templateUrl: './formulario.html',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  styleUrls: ['./formulario.css'],
})
export class FormularioComponent implements OnInit {
  producto: Producto = { idProducto: 0, nombre: '' };
  editMode = false;
  productos: Producto[] = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private storage: StorageService,
  ) {}

  ngOnInit() {
    // Cargar desde LocalStorage (SSR-safe gracias al servicio)
    this.productos = this.storage.getItem<Producto[]>('productos') || [];

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      const existente = this.productos.find((p) => p.idProducto === +id);
      if (existente) this.producto = { ...existente };
    }
  }

  guardar() {
    if (this.editMode) {
      const idx = this.productos.findIndex((p) => p.idProducto === this.producto.idProducto);
      if (idx !== -1) this.productos[idx] = { ...this.producto };
    } else {
      const nextId = this.productos.length
        ? Math.max(...this.productos.map((p) => p.idProducto)) + 1
        : 1;
      this.producto.idProducto = nextId;
      this.productos.push({ ...this.producto });
    }

    this.storage.setItem<Producto[]>('productos', this.productos);
    this.router.navigate(['/productos']);
  }
}
