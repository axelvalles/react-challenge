export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CreateProductDto {
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}
