import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EMPLEADO } from "../../modelos/empleado.modelo";
import { SERVICIO_EMPLEADOS } from "../../servicios/servicio_empleados";
import { COMPONENTE_LISTA_EMPLEADOS } from "../lista-empleados/componente_lista_empleados";
import { COMPONENTE_DETALLE_EMPLEADO } from "../detalle-empleado/componente_detalle_empleado";

@Component({
  selector: "app-panel",
  standalone: true,
  imports: [
    CommonModule,
    COMPONENTE_LISTA_EMPLEADOS,
    COMPONENTE_DETALLE_EMPLEADO
  ],
  templateUrl: "./componente_panel.html"
})
export class COMPONENTE_PANEL implements OnInit {
  @Input() public lista_empleados: EMPLEADO[] = [];
  public empleado_seleccionado: EMPLEADO | null = null;

  constructor(private servicio_empleados: SERVICIO_EMPLEADOS) {}

  ngOnInit(): void {
    this.cargar_empleados();
    if (this.lista_empleados.length > 0) {
      this.empleado_seleccionado = this.lista_empleados[0];
    }
  }

  public manejar_seleccion(empleado: EMPLEADO): void {
    if (!empleado) {
      return;
    }
    this.empleado_seleccionado = { ...empleado };
  }

  public manejar_guardado(empleado: EMPLEADO): void {
    if (!empleado) {
      return;
    }
    this.cargar_empleados();
    this.empleado_seleccionado = { ...empleado };
  }

  public cargar_empleados(): void {
    this.lista_empleados = this.servicio_empleados.obtener_empleados();
  }
}
