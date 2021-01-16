export type User = {
  createdAt: Date;
  email: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  phone: string | null;
  roles: Array<string>;
  updatedAt: Date;
  username: string;
};
