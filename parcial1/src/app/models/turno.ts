export interface TurnoDetalle {
  idProducto: number;
  cantidad: number;
}

export interface Turno {
  idTurno: number;
  fecha: string;
  horaInicioAgendamiento: string;
  horaFinAgendamiento: string;
  idProveedor: number;
  idJaula: number | null;
  productos?: TurnoDetalle[];
}
