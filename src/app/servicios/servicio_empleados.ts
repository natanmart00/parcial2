import { Injectable } from "@angular/core";
import { EMPLEADO } from "../modelos/empleado.modelo";

@Injectable({
  providedIn: "root"
})
export class SERVICIO_EMPLEADOS {
  private lista_empleados: EMPLEADO[] = [
    {
      id: 1,
      nombre: "Carlos Mendoza",
      cargo: "Desarrollador Senior",
      departamento: "Tecnología",
      salario: 2800,
      correo: "carlos.mendoza@empresa.com",
      estado: "Activo"
    },
    {
      id: 2,
      nombre: "Valeria Gómez",
      cargo: "Analista de Finanzas",
      departamento: "Contabilidad",
      salario: 1950,
      correo: "valeria.gomez@empresa.com",
      estado: "Activo"
    },
    {
      id: 3,
      nombre: "Roberto Sánchez",
      cargo: "Coordinador de Selección",
      departamento: "Recursos Humanos",
      salario: 1600,
      correo: "roberto.sanchez@empresa.com",
      estado: "Vacaciones"
    },
    {
      id: 4,
      nombre: "Elena Torres",
      cargo: "Diseñadora UX/UI",
      departamento: "Tecnología",
      salario: 2100,
      correo: "elena.torres@empresa.com",
      estado: "Activo"
    },
    {
      id: 5,
      nombre: "Mauricio Rivas",
      cargo: "Gerente de Operaciones",
      departamento: "Operaciones",
      salario: 3400,
      correo: "mauricio.rivas@empresa.com",
      estado: "Inactivo"
    }
  ];

  constructor() {}

  public obtener_empleados(): EMPLEADO[] {
    return [...this.lista_empleados];
  }

  public obtener_empleado_por_id(id_empleado: number): EMPLEADO | undefined {
    if (!id_empleado || id_empleado <= 0) {
      return undefined;
    }
    const encontrado = this.lista_empleados.find((elemento) => elemento.id === id_empleado);
    if (!encontrado) {
      return undefined;
    }
    return { ...encontrado };
  }

  public agregar_empleado(nuevo_empleado: EMPLEADO): void {
    if (!nuevo_empleado || !nuevo_empleado.nombre || !nuevo_empleado.cargo) {
      return;
    }
    const nuevo_id = this.lista_empleados.length > 0
      ? Math.max(...this.lista_empleados.map((item) => item.id)) + 1
      : 1;
    this.lista_empleados.push({
      ...nuevo_empleado,
      id: nuevo_id
    });
  }

  public modificar_empleado(empleado_modificado: EMPLEADO): boolean {
    if (!empleado_modificado || !empleado_modificado.id) {
      return false;
    }
    const indice = this.lista_empleados.findIndex((item) => item.id === empleado_modificado.id);
    if (indice === -1) {
      return false;
    }
    this.lista_empleados[indice] = { ...empleado_modificado };
    return true;
  }

  public eliminar_empleado(id_empleado: number): boolean {
    if (!id_empleado || id_empleado <= 0) {
      return false;
    }
    const indice = this.lista_empleados.findIndex((item) => item.id === id_empleado);
    if (indice === -1) {
      return false;
    }
    this.lista_empleados.splice(indice, 1);
    return true;
  }
}
