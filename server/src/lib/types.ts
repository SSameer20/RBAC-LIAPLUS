export interface Log {
  info: (message: string) => void;
  error: (message: string) => void;
}

export type UserRole = "admin" | "user";
