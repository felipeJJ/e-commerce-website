export interface Products{
    _id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagens?: any;  
    categoria: any;
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