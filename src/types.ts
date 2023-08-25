export type Category = {
  name: string;
  amount: number;
  breakdown?: SubCategory[];
};

export type SubCategory = {
  name: string;
  amount: number;
  transactions?: Transaction[];
};

export type Transaction = {
  id: string;
  name: string;
  service: string;
  amount: number;
  date: string;
};

export type Categories = {
  banks: Category;
  cogs: Category;
  income: Category;
  expense: Category;
  credit: Category;
};

export type Data = {
  date: string;
  categories: Categories;
};

export type GenerateMockData = (data: Categories, dates: string[]) => Data[];
