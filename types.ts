export interface Post {
  oid: string;
  title: string;
  // id: string;
  pub_date: string;
  url: string | null;
  categories: string[];
  summary: string;
  open_graph_image: string;
  archived?: boolean;
  body: string;
  hide_comments: boolean;
  disallow_comments: boolean;
  // comments: number;
}

export interface Comment {
  id: number;
  oid: string;
  comment: string;
  add_date: string;
  notApproved?: boolean;
  depth: number;
  name: string | null;
  replies?: Comment[];
}

export interface Comments {
  truncated: boolean;
  count: number;
  paginate_uri_previous?: string;
  paginate_uri_next?: string;
  tree: Comment[];
}
