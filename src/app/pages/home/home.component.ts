import { Component, OnInit } from '@angular/core';
import { BaseDto } from 'src/app/models/dto/base-dto';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { StorageService } from 'src/app/services/storage.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: BaseDto;

  constructor(
    private storage: StorageService,
    private router: Router,
    private notifyService : NotificationService,
    private funcionarioService: FuncionarioService) {  
      this.funcionarioService.findemail(this.storage.getIdUser().email).subscribe(
        (resp) => {
          this.usuario = resp;
          console.log(resp)
        }
      ) 
  
  }

  ngOnInit(): void {
    this.usuario = {} as BaseDto;
   try{ 
     this.usuario = this.storage.getIdUser(); 
    }
    catch{
      
    }
  this.funcionarioService.findemail(this.storage.getIdUser().email).subscribe(
      (resp) => {
        this.usuario = resp;
        console.log(resp)
      }
    ) 
    this.notifyService.showSuccess('Acesso',"Bemvindo ao Controle de Estoque")
  }
  logout() {
    this.storage.setLocalUser(null);
    this.router.navigate(['login']);
  }
}
