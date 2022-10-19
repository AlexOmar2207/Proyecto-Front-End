import { Pais } from "./pais";


export class Persona {
    idPersona: number = 0;
    nombres: string = "";
    apellidos: string = "";
    edad: number = 0;
    sexo: string = "";
    pais!: Pais;
}