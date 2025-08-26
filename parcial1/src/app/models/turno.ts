export interface TurnoDetalle {
  idProducto: number;
  nombreProducto: string;
  cantidad: number;
}

export interface Turno {
  idTurno: number;
  fecha: string;                       // Fecha del turno
  horaInicioAgendamiento: string;       // Ej: "08:00"
  horaFinAgendamiento: string;          // Ej: "09:00"
  idProveedor: number;                  // Relación con proveedor
  idJaula: number | null;               // Se asigna al iniciar recepción
  horaInicioRecepcion?: string | null;  // Hora real de inicio de recepción
  horaFinRecepcion?: string | null;     // Hora real de fin de recepción
  productos: TurnoDetalle[];            // Productos con cantidades
}

// Estados derivados en el listado
export type EstadoTurno = 'pendiente' | 'en recepcion' | 'completado';

export function calcularEstadoTurno(turno: Turno): EstadoTurno {
  if (turno.horaInicioRecepcion && turno.horaFinRecepcion) return 'completado';
  if (turno.horaInicioRecepcion && !turno.horaFinRecepcion) return 'en recepcion';
  return 'pendiente';
}
