import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-detalle-proceso",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./componente_detalle_proceso.html"
})
export class COMPONENTE_DETALLE_PROCESO implements OnInit {
  public parametro_proceso: string = "";

  constructor(
    private ruta_activa: ActivatedRoute,
    private enrutador: Router
  ) {}

  ngOnInit(): void {
    this.ruta_activa.paramMap.subscribe((parametros) => {
      const valor_parametro = parametros.get("proceso");
      if (!valor_parametro) {
        return;
      }
      this.parametro_proceso = valor_parametro;
    });
  }

  public volver_a_inicio(): void {
    this.enrutador.navigate(["/inicio"]);
  }
}
