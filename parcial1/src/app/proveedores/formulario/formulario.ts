import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

interface Proveedor {
  idProveedor: number;
  nombre: string;
}

@Component({
  selector: 'app-proveedores-formulario',
  templateUrl: './formulario.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
  styleUrls: ['./formulario.css'],
})
export class FormularioComponent {
  proveedor: Proveedor = { idProveedor: 0, nombre: '' };
  editMode = false;
  proveedores: Proveedor[] = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private storage: StorageService,
  ) {
    this.proveedores = this.storage.getItem<Proveedor[]>('proveedores') || [];
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      const prov = this.proveedores.find((p) => p.idProveedor === +id);
      if (prov) this.proveedor = { ...prov };
    }
  }

  guardar() {
    if (this.editMode) {
      const index = this.proveedores.findIndex((p) => p.idProveedor === this.proveedor.idProveedor);
      if (index !== -1) this.proveedores[index] = this.proveedor;
    } else {
      this.proveedor.idProveedor =
        this.proveedores.length > 0
          ? Math.max(...this.proveedores.map((p) => p.idProveedor)) + 1
          : 1;
      this.proveedores.push(this.proveedor);
    }

    this.storage.setItem('proveedores', this.proveedores);
    this.router.navigate(['/proveedores']);
  }
}
