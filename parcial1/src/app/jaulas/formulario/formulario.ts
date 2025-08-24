import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Jaula {
  idJaula: number;
  nombre: string;
  enUso: 'S' | 'N';
}

@Component({
  selector: 'app-jaulas-formulario',
  templateUrl: './formulario.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
  styleUrls: ['./formulario.css'],
})
export class FormularioComponent {
  jaula: Jaula = { idJaula: 0, nombre: '', enUso: 'N' };
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      // Aquí deberías cargar desde un servicio real
      this.jaula = { idJaula: +id, nombre: 'Jaula Demo', enUso: 'S' };
    }
  }

  guardar() {
    if (this.editMode) {
      console.log('Jaula actualizada:', this.jaula);
    } else {
      console.log('Jaula creada:', this.jaula);
    }
    this.router.navigate(['/jaulas']);
  }
}
