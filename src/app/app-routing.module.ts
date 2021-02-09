import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './account/shared/auth.guard'; 
import { ListProdutosComponent } from './pages/produtos/list-produtos/list-produtos.component';
import { EditProdutoComponent } from './pages/produtos/edit-produto/edit-produto.component';
import { LoginComponent } from './pages/auth/login/login.component';
//import { CompanyComponent } from './pages/company/company.component';   

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [ 
      { path: 'produtos', component: ListProdutosComponent },
      { path: 'produtos:/id', component: EditProdutoComponent },

  
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
