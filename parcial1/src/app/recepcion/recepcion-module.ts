import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecepcionRoutingModule } from './recepcion-routing-module';
import { ListadoTurnosComponent } from './listado-turnos/listado-turnos';
import { DetalleTurnoComponent } from './detalle-turno/detalle-turno';

@NgModule({
  imports: [
    ListadoTurnosComponent,
    DetalleTurnoComponent,
    CommonModule,
    FormsModule,
    RecepcionRoutingModule,
  ],
})
export class RecepcionModule {}
