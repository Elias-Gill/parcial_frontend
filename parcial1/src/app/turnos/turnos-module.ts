import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurnosRoutingModule } from './turnos-routing-module';
import { TurnosListadoComponent } from './listado/listado';
import { TurnosFormularioComponent } from './formulario/formulario';

@NgModule({
  imports: [
    TurnosFormularioComponent,
    TurnosListadoComponent,
    CommonModule,
    FormsModule,
    TurnosRoutingModule,
  ],
})
export class TurnosModule {}
