import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnosListadoComponent } from './listado/listado';
import { TurnosFormularioComponent } from './formulario/formulario';

const routes: Routes = [
  { path: '', component: TurnosListadoComponent },
  { path: 'nuevo', component: TurnosFormularioComponent },
  { path: 'editar/:id', component: TurnosFormularioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TurnosRoutingModule {}
