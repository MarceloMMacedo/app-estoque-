import { Component, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { BaseDto } from 'src/app/models/dto/base-dto';
import { ProdutoDto } from 'src/app/models/dto/produto-dto';
import { FornecedorProduto } from 'src/app/models/fornecedor-produto';
import { Pessoa } from 'src/app/models/pessoa';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {

  @Input() fornecedorproduto:FornecedorProduto;
  @Input() fornecedoresproduto:FornecedorProduto[];

  @Output() endfornecedor = new EventEmitter();

  @Input()  produtoId: number;
  produtos:ProdutoDto[];
  fornecedores:BaseDto[];
  @Input() status:boolean;

  constructor(
    private produtoService: ProdutoService,
  ) { }
  ngOnInit(): void {
    this.produtoService.fornecedores().subscribe(
      rest=>this.fornecedores=rest
    ) 
  }
save(){
this.endfornecedor.emit(null);
}
}
