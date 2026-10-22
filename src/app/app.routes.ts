import { Routes } from "@angular/router";
import { COMPONENTE_PANEL } from "./componentes/panel/componente_panel";
import { COMPONENTE_DETALLE_EMPLEADO } from "./componentes/detalle-empleado/componente_detalle_empleado";
import { COMPONENTE_REPORTES } from "./componentes/reportes/componente_reportes";
import { COMPONENTE_DETALLE_PROCESO } from "./componentes/detalle-proceso/componente_detalle_proceso";
import { COMPONENTE_NO_ENCONTRADO } from "./componentes/no-encontrado/componente_no_encontrado";

export const RUTAS_APLICACION: Routes = [
  {
    path: "",
    redirectTo: "inicio",
    pathMatch: "full"
  },
  {
    path: "inicio",
    component: COMPONENTE_PANEL
  },
  {
    path: "detalle/:id",
    component: COMPONENTE_DETALLE_EMPLEADO
  },
  {
    path: "reportes",
    component: COMPONENTE_REPORTES
  },
  {
    path: "proceso/:proceso",
    component: COMPONENTE_DETALLE_PROCESO
  },
  {
    path: "**",
    component: COMPONENTE_NO_ENCONTRADO
  }
];

export const routes: Routes = RUTAS_APLICACION;
