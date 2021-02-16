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
import { CategoriaProduto } from '../models/categoria-produto';
import { Produto } from '../models/produto'; 
import { BaseDto } from '../models/dto/base-dto';

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



  async getid(id): Promise<Produto> {
    return this.http.get<Produto>(`${API_CONFIG.produtos}/${id}`)
      .toPromise()
      .then(res => <Produto>res)
      .then(data => { return data; });
  }
  save(p: Produto) {
    return this.http.put(`${API_CONFIG.produtos}/${p.id}`, p,);
  }


  getAll(): Promise<ProdutoDto[]> {
    return this.http.get<ProdutoDto[]>(`${API_CONFIG.produtos}/getallprodutos`)
      .toPromise()
      .then(res => <ProdutoDto[]>res)
      .then(data => { return data; });
  }
  fornecedores(): Observable<BaseDto[]> {
    return this.http.get<BaseDto[]>(`${API_CONFIG.produtos}/fornecedores`)
  }
  insert(p) {
    return this.http.post(`${API_CONFIG.produtos}`, p, { observe: 'response', responseType: 'text' });
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
  insermodelo(m: Modelo) {
    console.log(m);
    return this.http.post(`${API_CONFIG.produtos}/insermodelo`, m, { observe: 'response', responseType: 'text' });
  }
  ismodelo(m: string): Promise<boolean> {
    console.log(m);
    return this.http.get<boolean>(`${API_CONFIG.produtos}/ismodelo?value=${m}`)
      .toPromise()
      .then(res => <boolean>res)
      .then(data => { return data; });
  }

  //categori produto
  allcategoriaprodutos(): Promise<CategoriaProduto[]> {
    return this.http.get<CategoriaProduto[]>(`${API_CONFIG.produtos}/allcategoriaprodutos`)
      .toPromise()
      .then(res => <ProdutoDto[]>res)
      .then(data => { return data; });
  }
  insertcategoriaproduto(m: CategoriaProduto) {
    console.log(m);
    return this.http.post(`${API_CONFIG.produtos}/insertcategoriaproduto`, m, { observe: 'response', responseType: 'text' });
  }
  iscategoriaproduto(m: string): Promise<boolean> {
    console.log(m);
    return this.http.get<boolean>(`${API_CONFIG.produtos}/iscategoriaproduto?value=${m}`)
      .toPromise()
      .then(res => <boolean>res)
      .then(data => { return data; });
  }
}
