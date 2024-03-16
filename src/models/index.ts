export type Article = {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
};

export type ApiResponse = {
  status: number;
  totalArticles: number;
  articles: Article[];
};

export type ApiRequest = {
  keywords: string;
  categories: string;
  from: string;
  to: string;
  lang: string;
};

export type HandleError = {
  open: boolean,
  title: string,
  details: string,
}

export type CategoriesType = {
  label: string;
  value: string;
};