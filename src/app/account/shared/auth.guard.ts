import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private notifyService : NotificationService,
    public storage: StorageService) {  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    try {
     // console.log('aut');
     // this.router.navigate(['login']);

      let localUser = this.storage.getLocalUser();
    
      console.log(localUser);

      const token = localUser.token;//window.localStorage.getItem('token');
      if (token != null) {
        //this.notifyService.showSuccess('Acesso',"Bemvindo ao Controle de Estoque");
        return true;
      } else {
        this.router.navigate(['login']);
        console.log('aut1');
        return false;
      }
    } catch (error) {
      if (
        this.storage.getLocalUser() != null) {
            console.log('aut2');
            this.router.navigate(['login']);
            return false;
      } else{
        console.log('aut3');
        this.router.navigate(['login']);
        return false;
      }

    }
  }
}
