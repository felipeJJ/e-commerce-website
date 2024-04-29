export interface Products{
    _id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagens?: any;  
    categoria: any;
    createdAt: number;
  }
export interface Category{
    _id: string;
    nomeCategoria: string;
    categoriaPai?: {
      _id: string;
      nomeCategoria: string;
    }
}
export interface CategoryResponse{
    message: string;
    category: []
}
export interface ProductsResponse{
    message: string;
    produtos: []
}
export interface FreightResponse{
    cepdestino: string;  
    ceporigem: string;
    prazopac: string;
    prazosedex: string;
    valorpac: string;
    valorsedex: string;
}

export interface UserInfoData{
  name: string,
  cpf: string,
  cellphone: string,
  email: string,
  password: string,
  confirmPassword: string,
  state: string,
  city: string,
  zip: string,
  address: string,
  houseNumber: string,
  district: string
}