import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Jaula } from '../../models/jaula';
import { ConfirmDialogJaulaComponent } from '../modal/modal';

@Component({
  selector: 'app-jaulas-listado',
  templateUrl: './listado.html',
  imports: [CommonModule, FormsModule, RouterModule, ConfirmDialogJaulaComponent],
  styleUrls: ['./listado.css'],
  standalone: true,
})
export class ListadoComponent {
  filtro: string = '';
  jaulas: Jaula[] = [];
  showConfirmDialog = false;
  jaulaAEliminar: number | null = null;

  constructor(private storage: StorageService) {
    const stored = this.storage.getItem<Jaula[]>('jaulas');
    if (stored) this.jaulas = stored;
  }

  get jaulasFiltradas(): Jaula[] {
    if (!this.filtro) return this.jaulas;
    return this.jaulas.filter((j) => j.nombre.toLowerCase().includes(this.filtro.toLowerCase()));
  }

  get jaulasDisponibles(): number {
    return this.jaulas.filter(j => !j.enUso).length;
  }

  get jaulasEnUso(): number {
    return this.jaulas.filter(j => j.enUso).length;
  }

  eliminarJaula(id: number) {
    this.jaulaAEliminar = id;
    this.showConfirmDialog = true;
  }

  onConfirmDelete() {
    if (this.jaulaAEliminar !== null) {
      this.jaulas = this.jaulas.filter((j) => j.idJaula !== this.jaulaAEliminar);
      this.storage.setItem('jaulas', this.jaulas);
    }
    this.showConfirmDialog = false;
    this.jaulaAEliminar = null;
  }

  onCancelDelete() {
    this.showConfirmDialog = false;
    this.jaulaAEliminar = null;
  }
}
