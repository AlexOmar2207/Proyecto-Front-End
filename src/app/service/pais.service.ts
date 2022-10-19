import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pais } from '../model/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private url: string = 'http://localhost:8080/pais';

  constructor(private http: HttpClient) { }

   // Metodo
   listar(){
    return this.http.get<Pais[]>(this.url); 
  }

}
