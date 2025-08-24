import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
    public router: Router,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      // Aquí deberías cargar el proveedor real desde un servicio
      this.proveedor = { idProveedor: +id, nombre: 'Proveedor Demo' };
    }
  }

  guardar() {
    if (this.editMode) {
      console.log('Proveedor actualizado:', this.proveedor);
    } else {
      console.log('Proveedor creado:', this.proveedor);
    }
    this.router.navigate(['/proveedores']);
  }
}
