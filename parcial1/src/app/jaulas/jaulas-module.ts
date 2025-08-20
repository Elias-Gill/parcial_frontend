import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JaulasRoutingModule } from './jaulas-routing-module';
import { ListadoComponent } from './listado/listado';
import { FormularioComponent } from './formulario/formulario';

@NgModule({
  imports: [CommonModule, FormsModule, JaulasRoutingModule, ListadoComponent, FormularioComponent],
})
export class JaulasModule {}
