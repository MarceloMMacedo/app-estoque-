import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';  
import { MenuItem } from 'primeng/api';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'; 
import { Contato } from 'src/app/models/contato';
import { ProdutoDto } from 'src/app/models/dto/produto-dto';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list-produtos',
  templateUrl: './list-produtos.component.html',
  styleUrls: ['./list-produtos.component.css'],
  styles: [`
  
  `]
})
export class ListProdutosComponent implements OnInit {
  @ViewChild('op') op: OverlayPanel;

  @ViewChild('overlayTarget') overlayTarget: ElementRef;

  toggleOverlay = ({ originalEvent }) => this.op.toggle(originalEvent);
 
  display: boolean = false;
  constructor(
    private produtosService: ProdutoService,
    private notificationService: NotificationService,
    private storageService:StorageService,
    private funcionarioService:FuncionarioService, 
  ) { }

  searchValue;
  produtos: ProdutoDto[]; 
  items: MenuItem[];

  searchEntry$: Subject<string> = new Subject<string>();

  ngOnInit(): void {
   
    this.produtosService.getAll().then(
      rest => {
        this.produtos = rest; 
        this.notificationService.showSuccess("Bem vindo", "Lista de Produtos")
      },
      error=>{
        this.storageService.logout;
      }
     
    );

    this.items = [
      {
        label: 'Adicionar', styleClass: 'p-button-sm', icon: 'pi pi-plus', command: () => {
          this.notificationService.showSuccess("Bem vindo", "Lista de Produtos");
          (event: any)=>{ 
          }
        }
        
      },
      { separator: true },
      {
        label: 'Imprimir', styleClass: 'p-button-sm', icon: 'pi pi-print', command: () => {
          this.printview();
        }
      },
      {
        label: 'Enviar por email', styleClass: 'p-button-sm', icon: 'pi pi-envelope', command: () => {
          this.opensendmail();
        }
      }
    ];

  }
  //actions
  newproduct() { 
  }
  printview() { 
    setTimeout(() => {
      this.produtosService.getview().subscribe(
        (response) => {
          console.log(response);
          const file = new Blob([response], { type: 'application/pdf' });

          console.log(file);
          const fileURL = URL.createObjectURL(file);

          console.log(fileURL);
          window.open(fileURL);
 
        });
    }, 1000);
  }
  opensendmail(){
    
    this.display=true;
  }
  sendmail(content) {
    console.log(content);
    this.produtosService.sendMail(content).subscribe();
    this.display=false;
  }
  addcontato(contact: Contato) {
   this.funcionarioService.insertcontact(this.storageService.getIdUser().id, contact).subscribe(
    )

  }
  
}
