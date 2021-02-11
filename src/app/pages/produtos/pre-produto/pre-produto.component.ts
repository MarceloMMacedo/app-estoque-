import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as jquery from 'jquery';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CategoriaProduto } from 'src/app/models/categoria-produto';
import { ProdutoDto } from 'src/app/models/dto/produto-dto';
import { Modelo } from 'src/app/models/modelo';
import { Produto } from 'src/app/models/produto';
import { NotificationService } from 'src/app/services/notification.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-pre-produto',
  templateUrl: './pre-produto.component.html',
  styleUrls: ['./pre-produto.component.css']
})
export class PreProdutoComponent implements OnInit {
  registerForm: FormGroup;
  produto: Produto;
  modelos: Modelo[];
  modelo: Modelo;
  filteredCountries: Modelo[];
  displaymodelo: boolean = false;

  categorias: CategoriaProduto[];
  categoria: CategoriaProduto;
  filteredcategoria: CategoriaProduto[];
  displaycategoria: boolean = false;

  public test = 'value-changed-1';
  items: MenuItem[];

  constructor(
    private produtoService: ProdutoService,
    private notificacao: NotificationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.modelo = {} as Modelo;
    this.produto = {} as Produto;
    this.produto.modelo = this.modelo;

    this.produto.categoriaproduto = {} as CategoriaProduto;
    this.produtoService.allmodelos().then(
      rest => {
        this.modelos = rest;
        this.filteredCountries = rest;
      },
      error => {

      }
    )

    this.categoria = {} as CategoriaProduto;
    this.produto.categoriaproduto = this.categoria;

    this.produtoService.allcategoriaprodutos().then(
      rest => {
        this.categorias = rest;
        this.filteredcategoria = rest;

      },
      error => {

      }
    )


  }


  filterModelo(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: Modelo[] = [] as Modelo[];
    let query = event.query;
    for (let i = 0; i < this.modelos.length; i++) {
      let model = this.modelos[i];
      if (model.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(model);
      }
    }

    this.filteredCountries = filtered;
  }
  newmodelo() {
    this.modelo = {} as Modelo;

    this.displaymodelo = true;
  }
  addmodelo() {
    let ismodel: boolean = false;
    this.produtoService.ismodelo(this.modelo.name).then(
      res => {
        ismodel = res;
        if (ismodel) {
          this.notificacao.showError("Modelo já está cadastrado", "Alerta")

        } else {
          this.produtoService.insermodelo(this.modelo).subscribe();
          this.notificacao.showSuccess("Modelo adicionado com sucesso", "Aviso")
          this.filteredCountries = [...this.filteredCountries, this.modelo];
          this.modelos = [...this.modelos, this.modelo];
          this.displaymodelo = false;
        }
      }
    )

  }


  //categoria
  filtercategoria(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: CategoriaProduto[] = [] as CategoriaProduto[];
    let query = event.query;
    for (let i = 0; i < this.categorias.length; i++) {
      let model = this.categorias[i];
      if (model.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(model);
      }
    }

    this.filteredCountries = filtered;
  }
  newcategoria() {
    this.categoria = {} as CategoriaProduto;

    this.displaycategoria = true;
  }
  addcategoria() {
    let ismodel: boolean = false;
    this.produtoService.iscategoriaproduto(this.categoria.name).then(
      res => {
        ismodel = res;
        if (ismodel) {
          this.notificacao.showError("Categoria já está cadastrado", "Alerta")

        } else {
          this.produtoService.insertcategoriaproduto(this.categoria).subscribe();
          this.notificacao.showSuccess("Categoria adicionado com sucesso", "Aviso")
          this.filteredCountries = [...this.filteredcategoria, this.categoria];
          this.categorias = [...this.categorias, this.categoria];
          this.displaycategoria = false;
        }
      }
    )

  }

  addproduto(event: Event) {

    //if (this.contacts.indexOf(this.contact) === -1) {


    // } 
    //  
    console.log("Deseja adicionar Produto?");
    this.confirmationService.confirm({
      target: event.target,
      message: "Deseja adicionar Produto?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.produtoService.insert(this.produto).subscribe(
          rest => {
            let index = rest.body;

            this.router.navigate(['/produtos', rest.body]);
          }
        )
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "Adição Cancelada "
        });
      }
    });
  }
  cancel() {

  }
}
