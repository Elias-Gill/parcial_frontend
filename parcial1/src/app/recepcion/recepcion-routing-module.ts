import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoTurnosComponent } from './listado-turnos/listado-turnos';
import { DetalleTurnoComponent } from './detalle-turno/detalle-turno';

const routes: Routes = [
  { path: '', component: ListadoTurnosComponent },
  { path: 'detalle/:id', component: DetalleTurnoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecepcionRoutingModule {}
