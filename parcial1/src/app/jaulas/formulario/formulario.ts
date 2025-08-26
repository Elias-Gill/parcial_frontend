import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Jaula } from '../../models/jaula';

@Component({
  selector: 'app-jaulas-formulario',
  templateUrl: './formulario.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
  styleUrls: ['./formulario.css'],
})
export class FormularioComponent {
  jaula: Jaula = { idJaula: 0, nombre: '', enUso: false };
  editMode = false;
  jaulas: Jaula[] = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private storage: StorageService,
  ) {
    // Cargar jaulas existentes desde LocalStorage
    const stored = this.storage.getItem<Jaula[]>('jaulas');
    if (stored) this.jaulas = stored;

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      // Cargar jaula existente si existe en LocalStorage
      const existente = this.jaulas.find((j) => j.idJaula === +id);
      if (existente) this.jaula = { ...existente };
    }
  }

  guardar() {
    if (this.editMode) {
      // Actualizar jaula existente
      const index = this.jaulas.findIndex((j) => j.idJaula === this.jaula.idJaula);
      if (index !== -1) this.jaulas[index] = { ...this.jaula };
    } else {
      // Crear nueva jaula
      const maxId = this.jaulas.length ? Math.max(...this.jaulas.map((j) => j.idJaula)) : 0;
      this.jaula.idJaula = maxId + 1;
      this.jaulas.push({ ...this.jaula });
    }

    // Guardar en LocalStorage
    this.storage.setItem('jaulas', this.jaulas);

    this.router.navigate(['/jaulas']);
  }
}
