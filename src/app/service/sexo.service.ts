import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sexo } from '../model/sexo';

@Injectable({
  providedIn: 'root'
})
export class SexoService {

  private url: string = 'http://localhost:8080/sexo';

  constructor(private http: HttpClient) { }


  listar(){
    return this.http.get<Sexo[]>(this.url);
  }

}
