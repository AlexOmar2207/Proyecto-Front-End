import { Pais } from "./pais";


export class Persona {
    idPersona: number = 0;
    nombres: string = "";
    apellidos: string = "";
    edad: number = 0;
    fecha: Date = new Date();
    sexo: string = "";
    pais!: Pais;
}