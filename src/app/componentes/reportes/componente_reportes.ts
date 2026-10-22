import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EMPLEADO } from "../../modelos/empleado.modelo";
import { SERVICIO_EMPLEADOS } from "../../servicios/servicio_empleados";

interface RESUMEN_DEPARTAMENTO {
  departamento: string;
  cantidad: number;
  total: number;
}

@Component({
  selector: "app-reportes",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./componente_reportes.html"
})
export class COMPONENTE_REPORTES implements OnInit {
  public lista_empleados: EMPLEADO[] = [];
  public total_empleados: number = 0;
  public total_salarios: number = 0;
  public promedio_salarial: number = 0;
  public salario_maximo: number = 0;
  public salario_minimo: number = 0;
  public total_activos: number = 0;
  public desglose_departamentos: RESUMEN_DEPARTAMENTO[] = [];

  constructor(private servicio_empleados: SERVICIO_EMPLEADOS) {}

  ngOnInit(): void {
    this.cargar_datos();
  }

  public cargar_datos(): void {
    this.lista_empleados = this.servicio_empleados.obtener_empleados();
    this.calcular_metricas();
  }

  private calcular_metricas(): void {
    if (!this.lista_empleados || this.lista_empleados.length === 0) {
      return;
    }
    this.total_empleados = this.lista_empleados.length;
    this.total_salarios = this.lista_empleados.reduce((acumulado, emp) => acumulado + emp.salario, 0);
    this.promedio_salarial = this.total_salarios / this.total_empleados;
    this.total_activos = this.lista_empleados.filter((emp) => emp.estado === "Activo").length;

    const salarios = this.lista_empleados.map((emp) => emp.salario);
    this.salario_maximo = Math.max(...salarios);
    this.salario_minimo = Math.min(...salarios);

    const mapa_departamentos = new Map<string, { cantidad: number; total: number }>();
    for (const emp of this.lista_empleados) {
      const actual = mapa_departamentos.get(emp.departamento) || { cantidad: 0, total: 0 };
      mapa_departamentos.set(emp.departamento, {
        cantidad: actual.cantidad + 1,
        total: actual.total + emp.salario
      });
    }

    this.desglose_departamentos = Array.from(mapa_departamentos.entries()).map(([depto, datos]) => ({
      departamento: depto,
      cantidad: datos.cantidad,
      total: datos.total
    }));
  }
}
