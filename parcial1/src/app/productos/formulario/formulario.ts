import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface Producto {
  idProducto: number;
  nombre: string;
}

@Component({
  selector: 'app-productos-formulario',
  templateUrl: './formulario.html',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  styleUrls: ['./formulario.css']
})
export class FormularioComponent {
  producto: Producto = { idProducto: 0, nombre: '' };
  editMode = false;

  constructor(private route: ActivatedRoute, public router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      // En la práctica, se cargaría desde un servicio
      this.producto = { idProducto: +id, nombre: 'Producto Demo' };
    }
  }

  guardar() {
    if (this.editMode) {
      console.log('Producto actualizado:', this.producto);
    } else {
      console.log('Producto creado:', this.producto);
    }
    this.router.navigate(['/productos']);
  }
}
