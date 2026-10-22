import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-no-encontrado",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./componente_no_encontrado.html"
})
export class COMPONENTE_NO_ENCONTRADO {
  constructor(private enrutador: Router) {}

  public ir_al_inicio(): void {
    this.enrutador.navigate(["/inicio"]);
  }
}
