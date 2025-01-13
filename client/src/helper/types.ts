export interface PostType {
  _id: string;
  creator: {
    _id: string;
    email: string;
    role: "user" | "admin";
    status: "active" | "restrict";
  };
  title: string;
  description?: string;
  createdAt: Date;
  status: "active" | "restrict";
  __v: number;
}
export interface UserType {
  _id: string;
  email?: string;
  password?: string;
  role?: string;
  posts: [string];
  createdAt: Date;
  updatedAt: Date;
  status: "active" | "restrict";
  __v: number;
}

export interface GetAllPost {
  message: string;
  posts?: PostType[];
}

export interface GetAllUser {
  message: string;
  users?: UserType[];
}
