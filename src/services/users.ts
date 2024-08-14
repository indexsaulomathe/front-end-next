// @/services/users.ts
import api from "./api";
import { User } from "@/types/user";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/users");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users");
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  roles: string[],
  blocked: boolean
): Promise<User> => {
  try {
    const response = await api.post<User>("/users", {
      name,
      email,
      password,
      roles,
      blocked,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw new Error("Failed to create user");
  }
};
