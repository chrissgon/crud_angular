export interface Products {
  [index: number]: {
    _id: string;
    nome: string;
    marca: string;
    modelo: string;
    preco: string;
    link_foto: string;
    descricao: string;
  };
}

export interface Product {
  _id: string;
  nome: string;
  marca: string;
  modelo: string;
  preco: string;
  link_foto: string;
  descricao: string;
}
