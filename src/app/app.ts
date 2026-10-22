import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { EMPLEADO } from "./modelos/empleado.modelo";
import { SERVICIO_EMPLEADOS } from "./servicios/servicio_empleados";
import { COMPONENTE_PANEL } from "./componentes/panel/componente_panel";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: "./app.html",
  styleUrl: "./app.css"
})
export class App implements OnInit {
  public nombre_sistema: string = "Sistema de Planilla";
  public lista_empleados: EMPLEADO[] = [];

  constructor(private servicio_empleados: SERVICIO_EMPLEADOS) {}

  ngOnInit(): void {
    this.cargar_empleados();
  }

  public al_activar_vista(componente: unknown): void {
    if (componente instanceof COMPONENTE_PANEL) {
      this.cargar_empleados();
      componente.lista_empleados = this.lista_empleados;
    }
  }

  private cargar_empleados(): void {
    this.lista_empleados = this.servicio_empleados.obtener_empleados();
  }
}
