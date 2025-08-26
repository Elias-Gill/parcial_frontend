import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Jaula } from '../../models/jaula';

@Component({
  selector: 'app-jaulas-listado',
  templateUrl: './listado.html',
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./listado.css'],
  standalone: true,
})
export class ListadoComponent {
  filtro: string = '';
  jaulas: Jaula[] = [];

  constructor(private storage: StorageService) {
    const stored = this.storage.getItem<Jaula[]>('jaulas');
    if (stored) this.jaulas = stored;
  }

  get jaulasFiltradas(): Jaula[] {
    if (!this.filtro) return this.jaulas;
    return this.jaulas.filter((j) => j.nombre.toLowerCase().includes(this.filtro.toLowerCase()));
  }

  eliminarJaula(id: number) {
    if (!confirm('¿Seguro que querés eliminar esta jaula?')) return;

    this.jaulas = this.jaulas.filter((j) => j.idJaula !== id);
    this.storage.setItem('jaulas', this.jaulas);
  }
}
