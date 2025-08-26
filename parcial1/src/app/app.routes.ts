import { Routes } from '@angular/router';

// Lazy loading de los módulos standalone o con routing module
export const routes: Routes = [
  {
    path: 'turnos',
    loadChildren: () => import('./turnos/turnos-routing-module').then((m) => m.TurnosRoutingModule),
  },
  {
    path: 'proveedores',
    loadChildren: () =>
      import('./proveedores/proveedores-routing-module').then((m) => m.ProveedoresRoutingModule),
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./productos/productos-routing-module').then((m) => m.ProductosRoutingModule),
  },
  {
    path: 'jaulas',
    loadChildren: () => import('./jaulas/jaulas-routing-module').then((m) => m.JaulasRoutingModule),
  },
  {
    path: '',
    redirectTo: 'turnos',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'turnos',
  },
];
