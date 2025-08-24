import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';

interface Jaula {
  idJaula: number;
  nombre: string;
  enUso: 'S' | 'N';
}

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
    // Cargar jaulas desde LocalStorage
    const stored = this.storage.getItem<Jaula[]>('jaulas');
    if (stored) this.jaulas = stored;
  }

  get jaulasFiltradas(): Jaula[] {
    if (!this.filtro) return this.jaulas;
    return this.jaulas.filter((j) => j.nombre.toLowerCase().includes(this.filtro.toLowerCase()));
  }
}
