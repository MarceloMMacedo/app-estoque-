import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { CommonModule } from '@angular/common'; 
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)


import { LOCALE_ID, NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import pt from '@angular/common/locales/pt';
import { ComponenteGeral } from './componente.geral';
import { HomeComponent } from './pages/home/home.component'; 
import { AccountService } from './account/shared/account.service';
import { AuthInterceptor } from './account/shared/auth-interceptor.service';
import { AuthGuard } from './account/shared/auth.guard';
import { ErrorInterceptor } from './account/shared/error-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxCurrencyModule } from "ngx-currency";
//import { CurrencyMaskModule } from "ngx-currency-mask"; 

import { FormsModule } from '@angular/forms';

import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

import { NgxChartsModule } from '@swimlane/ngx-charts';


import * as $ from 'jquery';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { StorageService } from './services/storage.service';
import { ListProdutosComponent } from './pages/produtos/list-produtos/list-produtos.component';
 

import { MessageService } from 'primeng/api';

import { ToastrModule } from 'ngx-toastr';
import { EditProdutoComponent } from './pages/produtos/edit-produto/edit-produto.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import {TableModule} from 'primeng/table';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { EmailComponent } from './pages/email/email/email.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';
import {ButtonModule} from 'primeng/button'; 
import {AccordionModule} from 'primeng/accordion';
import {EditorModule} from 'primeng/editor';
import {ToolbarModule} from 'primeng/toolbar';
import {MenuModule} from 'primeng/menu'; 
import {ScrollTopModule} from 'primeng/scrolltop';
import {DialogModule} from 'primeng/dialog';
import { LoginComponent } from './pages/auth/login/login.component';
import { PreProdutoComponent } from './pages/produtos/pre-produto/pre-produto.component'; 
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TabViewModule} from 'primeng/tabview';





const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};



@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    LoginComponent,
    ListProdutosComponent,
    EditProdutoComponent,
    EmailComponent,
    PreProdutoComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DragDropModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ComponenteGeral,
    NgxSpinnerModule, 
    AvatarModule,
    NgbModule, 

    NgxCurrencyModule,
    NgWizardModule.forRoot(ngWizardConfig),
    NgxChartsModule,
    FullCalendarModule,
    AngularEditorModule,
    ToastrModule.forRoot(),
    SplitButtonModule,
    TableModule,
    AvatarGroupModule,
    OverlayPanelModule,
    MultiSelectModule,
    ConfirmPopupModule, 
    AccordionModule,
    ButtonModule,
    EditorModule,
    MenuModule,
    ScrollTopModule,
    ToolbarModule,DialogModule,


    AccordionModule, 
    ButtonModule, 
    DialogModule,
    DragDropModule, 
    EditorModule,  
    MenuModule, 
    MultiSelectModule, 
    OverlayPanelModule,  
    SplitButtonModule, 
    ToolbarModule, 
    AutoCompleteModule,
    TabViewModule

  ],
  providers: [
    StorageService,
    MessageService,
    { provide: LOCALE_ID, useValue: "pt_BR" }, 
    AccountService,ConfirmationService,  
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
