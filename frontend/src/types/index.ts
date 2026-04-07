export type User = {
  id: string;
  name: string;
  email: string;
  cpf: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  category?: Category;
};

export type Order = {
  id: string;
  quantity: number;
  total: number;
  status: string;
  productId: string;
  product?: Product;
};
