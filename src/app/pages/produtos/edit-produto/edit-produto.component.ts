import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; import { parseHTML } from 'jquery';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoriaProduto } from 'src/app/models/categoria-produto';
import { Contato } from 'src/app/models/contato';
import { BaseDto } from 'src/app/models/dto/base-dto';
import { ProdutoDto } from 'src/app/models/dto/produto-dto';
import { FornecedorProduto } from 'src/app/models/fornecedor-produto';
import { Modelo } from 'src/app/models/modelo';
import { Produto } from 'src/app/models/produto';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-produto',
  templateUrl: './edit-produto.component.html',
  styleUrls: ['./edit-produto.component.css']
})
export class EditProdutoComponent implements OnInit {


  index;
  modelos: Modelo[];
  modelo: Modelo;
  filteredCountries: Modelo[];
  displaymodelo: boolean = false;
  display: boolean = false;

  categorias: CategoriaProduto[];
  categoria: CategoriaProduto;
  filteredcategoria: CategoriaProduto[];
  displaycategoria: boolean = false;

  produto: Produto = {} as Produto;
  fornecedor: FornecedorProduto;
  isnewfornecedor: boolean = false;
  fornecedoresbase: BaseDto[];
  fornecedores: BaseDto[];

  unidade = [
    { value: "Refil" },
    { value: "Unidade" },
    { value: "Litro" },
    { value: "Kilo" },
    { value: "Gramas" }
  ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutoService,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private funcionarioService: FuncionarioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fornecedorService: FornecedorService
  ) { }

  ngOnInit(): void {


    this.route.params.subscribe(params => this.index = params['id']);
    this.loadproduto();

    this.modelo = {} as Modelo;
    this.produto = {} as Produto;
    this.produto.modelo = this.modelo;

    this.produto.categoriaproduto = {} as CategoriaProduto;
    this.produtosService.allmodelos().then(
      rest => {
        this.modelos = rest;
        this.filteredCountries = rest;
      },
      error => {

      }
    )

    this.categoria = {} as CategoriaProduto;
    this.produto.categoriaproduto = this.categoria;

    this.produtosService.allcategoriaprodutos().then(
      rest => {
        this.categorias = rest;
        this.filteredcategoria = rest;
      },
      error => {

      }
    )
    this.fornecedorService.getAll().subscribe(
      rest => {
        this.fornecedores = rest;
        this.fornecedoresbase = rest
      })
  }



  async loadproduto() {
    await this.produtosService.getid(this.index).then(
      rest => {
        if (rest === null) {
          console.log("erro");
          this.notificationService.showError("Produto Inexistente", "Alerta");
          this.router.navigate(["produtos"]);
        } else {
          console.log(rest);
          this.produto = rest;
        }
      },
      error => {
        console.log("erro");
        this.notificationService.showError("Produto Inexistente", "Alerta");
        this.router.navigate(["produtos"]);
      }
    ).catch(
      erro => {
        console.log("erro");
        this.notificationService.showError("Produto Inexistente", "Alerta");
        this.router.navigate(["produtos"]);
      }
    )
  }
  onClickImagePrincipal() {
    $('#imgupload').trigger('click');
  }
  async save() {

    (this.produtosService.save(this.produto)).subscribe(
      rest => {
        this.notificationService.showSuccess("Produto Salvo com sucesso", "Sucesso");
        // this.produto = JSON.parse( rest.body);
        this.loadproduto();
      }
    )

  }
  async onUploadMainImage(event: Event) {

    //if (this.contacts.indexOf(this.contact) === -1) {


    // } 
    //  
    console.log("Deseja adicionar Produto?");
    this.confirmationService.confirm({
      target: event.target,
      message: "Deseja adicionar Produto?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.produtosService.insert(this.produto).subscribe(
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
  /*savefornecedor() {
    this.display = false;
    this.loadproduto();
  }*/
  excluirfornecedor() {

  }
  /*(event) {
    this.modal.confirm({
      nzTitle: 'Deseja Alterar Avatar da Cliente?',
      nzContent: '<b style="color: red;">É preciso Salvar para gravar os dados</b>',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: () => {
        if (this.index == '0') this.save;
       // this.company= this.pessoaService.uploadPicture(this.company, event, "empresa");
         
      },
      nzCancelText: 'Não'
    });


  }*/
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
    this.produtosService.ismodelo(this.modelo.name).then(
      res => {
        ismodel = res;
        if (ismodel) {
          this.notificationService.showError("Modelo já está cadastrado", "Alerta")

        } else {
          this.produtosService.insermodelo(this.modelo).subscribe(
            rest => {
              this.notificationService.showSuccess("Modelo adicionado com sucesso", "Aviso")
              this.modelo.id = parseFloat(rest.body);
              this.filteredCountries = [...this.filteredCountries, this.modelo];
              this.modelos = [...this.modelos, this.modelo];
              this.displaymodelo = false;
            }
          );

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
    this.produtosService.iscategoriaproduto(this.categoria.name).then(
      res => {
        ismodel = res;
        if (ismodel) {
          this.notificationService.showError("Categoria já está cadastrado", "Alerta")

        } else {
          this.produtosService.insertcategoriaproduto(this.categoria).subscribe(
            rest => {
              this.categoria.id = parseFloat(rest.body);
              this.notificationService.showSuccess("Categoria adicionado com sucesso", "Aviso")
              this.filteredCountries = [...this.filteredcategoria, this.categoria];
              this.categorias = [...this.categorias, this.categoria];
            });

          this.displaycategoria = false;
        }
      }
    )

  }
  //fornecedor
  newfornecedor() {
    this.fornecedor = {} as FornecedorProduto;

    this.isnewfornecedor = true;
  }
  savefornecedor() {
    if (this.isnewfornecedor) {
      this.insertFornecedor();
    } else {
      this.produtosService.updatefornecedorproduto(this.produto.id, this.fornecedor).subscribe(
        rest => {
          this.notificationService.showSuccess("Fornecedor do produto salvo com sucesso", "");
          let id = parseFloat(rest.body);
          this.produto.valorinterno=id;
         // this.loadproduto();
        }
      )
    }

  }
  insertFornecedor() {
    console.log(this.fornecedor);
    this.produtosService.insertfornecedorproduto(this.index, this.fornecedor).subscribe(
      rest => {
        let id = parseFloat(rest.body);
        this.fornecedor.id = id;
        this.notificationService.showSuccess("Fornecedor do produto adicionado com sucesso", "");
        this.produto.fornecedores = [...this.produto.fornecedores, this.fornecedor];
        this.isnewfornecedor = false;
        this.loadproduto();

      }
    );
  }
  editfornrcedor(f) {
    this.isnewfornecedor = false;
    this.fornecedor = f;
  }
  filterfornecedor(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    console.log(event.query)
    let filtered: BaseDto[] = [] as BaseDto[];
    let query = event.query;
    for (let i = 0; i < this.fornecedoresbase.length; i++) {
      let model = this.fornecedoresbase[i];
      console.log(model.name.toLowerCase());
      if (model.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(model);
      }
    }

    this.fornecedores = filtered;
  }
}
