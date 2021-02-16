import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './account/shared/auth.guard';  
import { LoginComponent } from './pages/auth/login/login.component';
import { EditProdutoComponent } from './pages/produtos/edit-produto/edit-produto.component';
import { ListFornecedoresComponent } from './pages/fornecedores/list-fornecedores/list-fornecedores.component';
import { EditFornecedoresComponent } from './pages/fornecedores/edit-fornecedores/edit-fornecedores.component';
import { ListProdutosComponent } from './pages/produtos/list-produtos/list-produtos.component';
//import { CompanyComponent } from './pages/company/company.component';   

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [ 
      { path: 'produtos', component: ListProdutosComponent },
      { path: 'produtos/:id', component: EditProdutoComponent },
      { path: 'fornecedor', component: ListFornecedoresComponent },
      { path: 'fornecedor/:id', component: EditFornecedoresComponent },

  
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
