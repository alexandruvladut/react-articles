export interface Article {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
}

export interface ArticleState {
  articles: Article[]
}

export interface ArticleForm {
  title: string;
  content: string;
  author: string;
}
