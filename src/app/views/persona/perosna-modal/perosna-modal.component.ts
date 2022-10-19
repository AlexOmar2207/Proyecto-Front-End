import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../../service/persona.service';
import { Persona } from '../../../model/persona';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Pais } from '../../../model/pais';
import { PaisService } from 'src/app/service/pais.service';
import { Sexo } from 'src/app/model/sexo';
import { SexoService } from 'src/app/service/sexo.service';


@Component({
  selector: 'app-perosna-modal',
  templateUrl: './perosna-modal.component.html',
  styleUrls: ['./perosna-modal.component.css']
})
export class PerosnaModalComponent implements OnInit {

  persona!: Persona;
  pais!: Pais[];
  sexo!: Sexo[];

  constructor(
    private dialogRef: MatDialogRef<PerosnaModalComponent>,
    private sexoService: SexoService,
    private paisService: PaisService,
    private personaService: PersonaService,
    @Inject(MAT_DIALOG_DATA) private data: Persona

  ) { }

  ngOnInit(): void {
    this.persona = new Persona();
    this.persona.idPersona = this.data.idPersona;
    this.persona.nombres = this.data.nombres;
    this.persona.apellidos = this.data.apellidos;
    this.persona.edad = this.data.edad;
    this.persona.sexo = this.data.sexo;
    this.persona.pais = this.data.pais;

    this.sexoService.listar().subscribe(data => {
      this.sexo = data
    })

    this.paisService.listar().subscribe(data => {
      this.pais = data;
    })
  }

  aceptar(){
    if(this.persona != null && this.persona.idPersona > 0){

      // Programacion reactiva!!
      this.personaService.editar(this.persona).subscribe(() => {
        return this.personaService.listar().subscribe(data =>{
          this.personaService.personaActualizar.next(data);
        })
      });
    }else{
      this.personaService.registrar(this.persona).subscribe(()=>{
        this.personaService.listar().subscribe(data => {
          this.personaService.personaActualizar.next(data);
        })
      })
    }
    this.cancelar();
  }

  cancelar(){
    this.dialogRef.close();
  }

}
