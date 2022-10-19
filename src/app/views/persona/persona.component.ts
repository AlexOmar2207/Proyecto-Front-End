import { Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from 'src/app/model/persona';
import {MatTableDataSource} from '@angular/material/table'
import { PersonaService } from 'src/app/service/persona.service';
import {MatDialog} from '@angular/material/dialog'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PerosnaModalComponent } from './perosna-modal/perosna-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  displayedColumns = ['idPersona', 'nombres', 'apellidos', 'edad', 'sexo', 'pais', 'actions'];
  dataSource!: MatTableDataSource<Persona>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cant: number = 0;


  // Lo primero es crear el servicio *persona.service.ts*
  // Lo mandamos llamar
  constructor(
    private personaService: PersonaService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {

    this.personaService.personaActualizar.subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    // this.personaService.listar().subscribe(data => {
    //   this.dataSource = new MatTableDataSource(data);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });


    this.personaService.listPagebla(0,10).subscribe(data => {
      this.cant = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openModal(persona?: Persona){

    let person = persona != null ? persona: new Persona();

    this.dialog.open(PerosnaModalComponent,{
      width: '300px',
      data: person
    })
    }

 onDelete(id:number){
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {
    disableClose:  true
  });
  dialogRef.afterClosed().subscribe(estado => {
    if(estado){
      this.personaService.eliminar(id).subscribe(()=> {
        this.personaService.listar().subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
        })
      })
    }
  })
 }

 Paginator(e: any){
  this.personaService.listPagebla(e.pageIndex, e.pageSize).subscribe(data => {
    this.cant = data.totalElements;
    this.dataSource = new MatTableDataSource(data.content);
    this.dataSource.sort = this.sort;
  });
 }

 filtrar(valor: string){
  this.dataSource.filter = valor.trim().toLowerCase();
 }





}
