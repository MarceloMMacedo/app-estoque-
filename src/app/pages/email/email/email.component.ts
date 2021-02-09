import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'; 
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Contato } from 'src/app/models/contato';
import { DestinationEmail } from 'src/app/models/destination-email';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  @Input() name;
  @Output() htmlContent;
  @Output() destinatariemailemitter = new EventEmitter<DestinationEmail>();
  @Output() adddestinatariemailemitter = new EventEmitter<Contato>();
  destinationEmail: DestinationEmail;
  listaDestinos: string[];
  contacts: Contato[];
  contactssend: Contato[];
  contact: Contato;
  email;
  nome;
  constructor(
    private storege: StorageService,
    private funcionariosServices: FuncionarioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.destinationEmail = {} as DestinationEmail;
    this.destinationEmail.to=[] as string[];
    this.destinationEmail.html='';
    this.destinationEmail.messageSubject='';
    this.contact={} as Contato;
    this.contacts =[] as Contato[];
    this.contact.email='';
    this.contact.name="";
    this.funcionariosServices.getcontacts(this.storege.getIdUser().id).subscribe(
      rest => {
        this.contacts = rest;
      }
    )
  }
  send() {
    //console.log('this-' + this.destinationEmail.html);
    this.destinatariemailemitter.emit(this.destinationEmail);  
  }
adddestinatario(event: Event){
 
  //if (this.contacts.indexOf(this.contact) === -1) {
    
       
 // } 
  //  


  this.confirmationService.confirm({
    target: event.target,
    message: "Deseja adicionar contato?",
    icon: "pi pi-exclamation-triangle",
    accept: () => {
      this.contacts = [...this.contacts, this.contact]
      this.adddestinatariemailemitter.emit(this.contact);
      this.contact={};
    },
    reject: () => {
      this.messageService.add({
        severity: "error",
        summary: "Rejected",
        detail: "You have rejected"
      });
    }
  });
}
cancel(){
 
}
}
