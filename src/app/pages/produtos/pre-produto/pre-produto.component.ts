import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoriaProduto } from 'src/app/models/categoria-produto';
import { ProdutoDto } from 'src/app/models/dto/produto-dto';
import { Modelo } from 'src/app/models/modelo';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-pre-produto',
  templateUrl: './pre-produto.component.html',
  styleUrls: ['./pre-produto.component.css']
})
export class PreProdutoComponent implements OnInit {
  registerForm: FormGroup;
  produto: Produto;
  modelos:Modelo[];
  modelo:Modelo;
  constructor(
    private produtoService:ProdutoService,
  ) { }

  ngOnInit(): void {
    this.produto={} as Produto;
    this.produto.modelo={} as Modelo;
    this.produto.categoriaproduto={} as CategoriaProduto;
    this.produtoService.allmodelos().then(
      rest=>{
        this.modelos=rest;
      },
      error=>{
        
      }
    )
  }

}
