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
  name: string;
  cpf: string;
  cellphone: string;
  email: string;
  password: string;
  confirmPassword: string;
  state: string;
  city: string;
  zip: string;
  address: string;
  houseNumber: string;
  district: string
}

export interface UserInfoDataAuth{
  name: string;
  cpf: string;
  cellphone: string;
  email: string;
  state: string;
  city: string;
  zip: string;
  address: string;
  houseNumber: string;
  district: string
}

export interface UserAddress {
  state: string;
  city: string;
  zip: string;
  address: string;
  houseNumber: string;
  district: string
}

interface Company {
  id: number;
  name: string;
  picture: string;
}

export interface DeliveryOption {
  id: number;
  name: string;
  price: string;
  custom_price: string;
  discount: string;
  currency: string;
  delivery_time: number;
  delivery_range: {
    min: number;
    max: number;
  };
  custom_delivery_time: number;
  custom_delivery_range: {
    min: number;
    max: number;
  };
  packages: {};
  additional_services: {};
  company: Company;
}

export interface creditCardData {
  _id?: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  cardHolderName: string;
  userId?: string;
  iv?: string;
}

export interface Link {
  Method: string;
  Rel: string;
  Href: string;
}

export interface CreditCard {
  CardNumber: string;
  Holder: string;
  ExpirationDate: string;
  SaveCard: boolean;
  Brand: string;
}

export interface Payment {
  ServiceTaxAmount: number;
  Installments: number;
  Interest: number;
  Capture: boolean;
  Authenticate: boolean;
  Recurrent: boolean;
  CreditCard: CreditCard;
  Tid: string;
  SoftDescriptor: string;
  Provider: string;
  NewCard: CreditCard;
  IsQrCode: boolean;
  Amount: number;
  ReceivedDate: string;
  Status: number;
  IsSplitted: boolean;
  ReturnMessage: string;
  ReturnCode: string;
  PaymentId: string;
  Type: string;
  Currency: string;
  Country: string;
  Links: Link[];
}

export interface Customer {
  Name: string;
}

export interface ApiResponse {
  MerchantOrderId: string;
  Customer: Customer;
  Payment: Payment;
}