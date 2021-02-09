import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';
import {MessageService} from 'primeng/api';
/*import { Company } from '../models/company/company';
import { Endereco } from '../models/Endereco';
import { CepService } from './cep.service';
import { Pessoa } from '../models/pessoas/pessoa';*/
@Injectable({
  providedIn: 'root'
})
export class UtilsService { 

  constructor(
    public http: HttpClient, private messageService: MessageService
    //public cepService: CepService 
  ) { }

  getNewId(): string {
    let d = new Date();
    let n = d.getTime();
    const chars = n + 'abcdefghijklmnopqrstuv';
    let randominputstring = '';
    for (let i = 0; i < 20; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randominputstring += chars.substring(rnum, rnum + 1);
    }
    return randominputstring;
  }

  createNotification(type, title,msg ): void {
   /* this.notification.create(
      type, title, msg,
      { nzPlacement: 'bottomRight' }
    );*/
    this.messageService.add({severity:type, summary: title, detail: msg});
  }
  numberToReal(numero) {
    var n: number = Number(numero);
    var nume = n.toFixed(2).split('.');
    nume[0] = "R$ " + nume[0].split(/(?=(?:...)*$)/).join('.');
    return nume.join(',');
  }
 

  getDataReceita(cnpj: string): any {
    return this.http.jsonp<any>(`https://www.receitaws.com.br/v1/cnpj/` + cnpj, 'callback');
  }
 
  getDataCep(cep: string): any {
    return this.http.get<any>("https://viacep.com.br/ws/" + cep + "/json/");
  }
  apenasNumeros(string: string) {
    //console.log(string);
    var numsStr = string.replace(/[^0-9]/g, '');
    return numsStr;
  }
  getEndereco(cep: string): Observable<any> {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  
}
