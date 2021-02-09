import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UtilsService } from './utils.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProdutoDto } from '../models/dto/produto-dto';
import { DestinationEmail } from '../models/destination-email';
import { Modelo } from '../models/modelo';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService
  ) { }


  getAll(): Promise<ProdutoDto[]> {
    return this.http.get<ProdutoDto[]>(`${API_CONFIG.produtos}/getallprodutos`)
      .toPromise()
      .then(res => <ProdutoDto[]>res)
      .then(data => { return data; });
  }
  getview(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(`${API_CONFIG.produtos}/viewpdf`, httpOptions);
  }
  sendMail(e: DestinationEmail) {
    console.log(e);
    return this.http.put(`${API_CONFIG.produtos}/sendmail`, e);
  }

  allmodelos(): Promise<Modelo[]> {
    return this.http.get<Modelo[]>(`${API_CONFIG.produtos}/allmodelos`)
      .toPromise()
      .then(res => <ProdutoDto[]>res)
      .then(data => { return data; });
  }
insermodelo(m:Modelo){
  return this.http.put(`${API_CONFIG.produtos}/insermodelo`, m);
}

}
