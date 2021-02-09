import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/shared/account.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] ,
    providers: [MessageService]
    
})
export class LoginComponent implements OnInit {
 login = {
    email: '',
    senha: ''
  };
 constructor(
    private accountService: AccountService,
    private router: Router,
    public storage: StorageService,
    private   messageService: MessageService
  ) { }

  ngOnInit() {
   
      let i=0;
      while(i<10){
        
      console.log(i++); 
       this.messageService.add({
        severity: 'success',
        summary: 'Success Message',
        key: 'myToast',
        detail: 'Order submitted'
      }); 
   }
    /*try {
     let localUser = this.storage.getLocalUser();
      console.log(localUser);

      const token = localUser.token;//window.localStorage.getItem('token');
      if (token != null) {
        this.accountService.refreshToken()
          .subscribe(response => {
            this.accountService.successfulLogin(response.headers.get('Authorization'),
              response.headers.get('ID_Company') );
            console.log('reflash : ' + response.headers.get('Authorization'));
            this.router.navigate(['index']);
          },
            error => {
              this.accountService.logout();
              this.router.navigate(['login'])
            });
      }
    } catch (error) {
      this.accountService.logout();

      this.router.navigate(['login'])
    }*/
  }

  async onSubmit() {

    try {
      //this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Message Content'});
      this.accountService.login(this.login);
      console.log('Login efetuado');

    } catch (error) {
      console.error(error);
    }
  }

}
