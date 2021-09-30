export interface Post {
  oid: string;
  title: string;
  pub_date: string;
  url: string | null;
  categories: string[];
  summary: string;
  open_graph_image: string;
  archived?: boolean;
  body: string;
  hide_comments: boolean;
  disallow_comments: boolean;
}

export interface Comment {
  id: number;
  oid: string;
  comment: string;
  add_date: string;
  not_approved?: boolean;
  depth: number;
  name: string | null;
  replies?: Comment[];
}

export interface Comments {
  truncated: boolean;
  count: number;
  next_page: number | null;
  previous_page: number | null;
  tree: Comment[];
}
