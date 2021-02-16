import { CategoriaProduto } from "./categoria-produto";
import { FornecedorProduto } from "./fornecedor-produto";
import { Modelo } from "./modelo"; 

export interface Produto {
    id?: number;
    name?: string;
    especificação?: string;
    dataEntrada?: Date;
    categoriaproduto?: CategoriaProduto;
    tipoproduto?: string;// servico / produto
    modelo?: Modelo;
    nameComplemento?: string;
    localizacao?: string;
    altura: number;
    lagura: number;
    comprimento: number;
    peso: number;
    avatar?: string;
    avatarView?: string;
    unidadeproduto?: string;
    CodBarra?: string;
    status?: string;
    saldo: number;// saldo total de itens em estoque:number;
    saldoweb: number;// saldo total de itens em estoque:number;
    saldocontrato: number;// saldo total de itens em estoque;    
    fornecedores?: FornecedorProduto[];
    valorinterno: number;
}
