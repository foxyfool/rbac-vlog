export type User = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  token: string;
};

export type AuthResponse = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  token: string;
};
