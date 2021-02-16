import { BaseDto } from "./dto/base-dto";
import { Pessoa } from "./pessoa";

export interface FornecedorProduto {
    id?: number;
    name?: string;
    fornecedor?: BaseDto;
    valor?: number;
}
