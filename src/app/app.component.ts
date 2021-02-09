import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-estoque';


  constructor(
    private   messageService: MessageService,private notifyService : NotificationService
  ) {
     
 }
   
  
}
