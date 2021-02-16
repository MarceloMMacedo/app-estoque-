import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDto } from 'src/app/models/dto/base-dto';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list-fornecedores',
  templateUrl: './list-fornecedores.component.html',
  styleUrls: ['./list-fornecedores.component.css']
})
export class ListFornecedoresComponent implements OnInit {

  visible = false;
  pessoas: BaseDto[] = [] as BaseDto[];
  constructor(public storage: StorageService,
    private router: Router,
    private fornecedoresService: FornecedorService,) { }

  ngOnInit(): void {
    this.fornecedoresService.getAll().subscribe(
      rest =>
        this.pessoas = rest
    )
  }

}
