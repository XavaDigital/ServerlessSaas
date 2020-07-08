export interface Post {
  uid: string;
  data: {
    title: string;
    subtitle: string;
    content: string;
    summary: string;
    image: {
      url: string;
    };
    date: string;
    author: Author;
    slug: string;
  };
}

export interface Author {
  name: string;
  picture: string;
}
