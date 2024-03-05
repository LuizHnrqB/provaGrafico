export interface Comidas {
  Pizza: {
    nome: string;
    vendas: number[];
  }[];
  Sanduíche: {
    nome: string;
    vendas: number[];
  }[];
  Sushi: {
    nome: string;
    vendas: number[];
  }[];
}
export interface Eletronicos {
  Microondas: {
    nome: string;
    vendas: number[];
  }[];
  Geladeiras: {
    nome: string;
    vendas: number[];
  }[];
  AirFrier: {
    nome: string;
    vendas: number[];
  }[];
}
export interface Roupas {
  Camisas: {
    nome: string;
    vendas: number[];
  }[];
  Calças: {
    nome: string;
    vendas: number[];
  }[];
  Bonés: {
    nome: string;
    vendas: number[];
  }[];
}
export interface filteredData {
  nome: string;
  vendas: number[];
}
