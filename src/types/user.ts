export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  blocked: boolean;
  createdAt: string;
}
