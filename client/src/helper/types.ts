export interface PostType {
  _id: string;
  creator: string;
  title: string;
  description?: string;
  createdAt: Date;
  status: "active" | "restrict";
  __v: number;
}

export interface GetAllPost {
  message: string;
  posts?: PostType[];
}
