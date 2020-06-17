export interface Tag {
  name: string;
  backgroundColor?: string;
  color?: string;
}

export interface ArticleAuthor {
  name: string;
  github?: string;
  linkedIn?: string;
  profilePicture?: string;
  description?: string;
}

export interface ArticleProps {
  date: string;
  tags?: Tag[];
  thumbnail: string;
  title: string;
  subTitle: string;
  author: ArticleAuthor;
  timeToRead?: number;
}

export interface ArticleObject {
  featured: ArticleProps;
  standard: ArticleProps[];
}
