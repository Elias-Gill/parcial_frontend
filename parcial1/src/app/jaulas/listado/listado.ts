import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Jaula {
  idJaula: number;
  nombre: string;
  enUso: 'S' | 'N';
}

@Component({
  selector: 'app-jaulas-listado',
  templateUrl: './listado.html',
  imports: [CommonModule],
  styleUrls: ['./listado.css'],
  standalone: true
})
export class ListadoComponent {
  filtro: string = '';
  jaulas: Jaula[] = [
    { idJaula: 1, nombre: 'Jaula 1', enUso: 'N' },
    { idJaula: 2, nombre: 'Jaula 2', enUso: 'S' },
    { idJaula: 3, nombre: 'Jaula 3', enUso: 'N' }
  ];

  get jaulasFiltradas(): Jaula[] {
    if (!this.filtro) return this.jaulas;
    return this.jaulas.filter(j =>
      j.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
