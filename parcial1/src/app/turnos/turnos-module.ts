import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurnosRoutingModule } from './turnos-routing-module';
import { ListadoComponent } from './listado/listado';
import { FormularioComponent } from './formulario/formulario';

@NgModule({
  imports: [ListadoComponent, FormularioComponent, CommonModule, FormsModule, TurnosRoutingModule],
})
export class TurnosModule {}
