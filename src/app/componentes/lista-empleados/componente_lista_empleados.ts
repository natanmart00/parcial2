import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { EMPLEADO } from "../../modelos/empleado.modelo";
import { SERVICIO_EMPLEADOS } from "../../servicios/servicio_empleados";

@Component({
  selector: "app-lista-empleados",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./componente_lista_empleados.html"
})
export class COMPONENTE_LISTA_EMPLEADOS {
  @Input() empleados: EMPLEADO[] = [];
  @Output() al_seleccionar = new EventEmitter<EMPLEADO>();
  @Output() al_editar = new EventEmitter<EMPLEADO>();

  public id_seleccionado: number | null = null;

  constructor(
    private enrutador: Router,
    private servicio_empleados: SERVICIO_EMPLEADOS
  ) {}

  public seleccionar_empleado(empleado: EMPLEADO): void {
    if (!empleado || !empleado.id) {
      return;
    }
    this.id_seleccionado = empleado.id;
    this.al_seleccionar.emit(empleado);
  }

  public editar_empleado(empleado: EMPLEADO): void {
    if (!empleado || !empleado.id) {
      return;
    }
    this.id_seleccionado = empleado.id;
    this.al_editar.emit(empleado);
    this.enrutador.navigate(["/detalle", empleado.id]);
  }

  public eliminar_empleado(empleado: EMPLEADO): void {
    if (!empleado || !empleado.id) {
      return;
    }
    empleado.estado = "Inactivo";
    this.servicio_empleados.modificar_empleado(empleado);
  }
}
