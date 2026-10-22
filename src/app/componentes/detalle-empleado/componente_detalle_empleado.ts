import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EMPLEADO } from "../../modelos/empleado.modelo";
import { SERVICIO_EMPLEADOS } from "../../servicios/servicio_empleados";

@Component({
  selector: "app-detalle-empleado",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./componente_detalle_empleado.html"
})
export class COMPONENTE_DETALLE_EMPLEADO implements OnInit, OnChanges {
  @Input() empleado: EMPLEADO | null = null;
  @Output() al_guardar = new EventEmitter<EMPLEADO>();

  public id_empleado: number = 0;
  public datos_formulario: EMPLEADO = {
    id: 0,
    nombre: "",
    cargo: "",
    departamento: "",
    salario: 0,
    correo: "",
    estado: "Activo"
  };

  constructor(
    private ruta_activa: ActivatedRoute,
    private enrutador: Router,
    private servicio_empleados: SERVICIO_EMPLEADOS
  ) {}

  ngOnInit(): void {
    if (this.empleado) {
      this.sincronizar_formulario();
      return;
    }
    this.ruta_activa.paramMap.subscribe((parametros) => {
      const parametro_id = parametros.get("id");
      if (!parametro_id) {
        return;
      }
      const id_numerico = Number(parametro_id);
      if (!id_numerico || isNaN(id_numerico)) {
        return;
      }
      this.id_empleado = id_numerico;
      this.cargar_datos_empleado(id_numerico);
    });
  }

  ngOnChanges(cambios: SimpleChanges): void {
    if (!this.empleado) {
      return;
    }
    this.sincronizar_formulario();
  }

  public guardar_cambios(): void {
    if (!this.datos_formulario || !this.datos_formulario.id) {
      return;
    }
    const guardado = this.servicio_empleados.modificar_empleado(this.datos_formulario);
    if (!guardado) {
      return;
    }
    this.empleado = { ...this.datos_formulario };
    this.al_guardar.emit({ ...this.datos_formulario });
    if (this.enrutador.url.includes("/detalle")) {
      this.enrutador.navigate(["/inicio"]);
    }
  }

  public volver_al_inicio(): void {
    this.enrutador.navigate(["/inicio"]);
  }

  private sincronizar_formulario(): void {
    if (!this.empleado) {
      return;
    }
    this.datos_formulario = { ...this.empleado };
    this.id_empleado = this.empleado.id;
  }

  private cargar_datos_empleado(id: number): void {
    const encontrado = this.servicio_empleados.obtener_empleado_por_id(id);
    if (!encontrado) {
      return;
    }
    this.empleado = encontrado;
    this.datos_formulario = { ...encontrado };
  }
}
