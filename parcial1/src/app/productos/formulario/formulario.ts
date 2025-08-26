import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Producto } from '../../models/producto';
import { Proveedor } from '../../models/proveedor';

@Component({
  selector: 'app-productos-formulario',
  templateUrl: './formulario.html',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  styleUrls: ['./formulario.css'],
})
export class FormularioComponent implements OnInit {
  producto: Producto = { idProducto: 0, nombre: '', idProveedor: undefined };
  editMode = false;
  productos: Producto[] = [];
  proveedores: Proveedor[] = []; // lista de proveedores para el select

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private storage: StorageService,
  ) {}

  ngOnInit() {
    // Cargar productos
    this.productos = this.storage.getItem<Producto[]>('productos') || [];

    // Cargar proveedores
    this.proveedores = this.storage.getItem<Proveedor[]>('proveedores') || [];

    // Revisar si es edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      const existente = this.productos.find((p) => p.idProducto === +id);
      if (existente) this.producto = { ...existente };
    }
  }

  guardar() {
    if (!this.producto.idProveedor) {
      alert('Debes seleccionar un proveedor.');
      return;
    }

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
