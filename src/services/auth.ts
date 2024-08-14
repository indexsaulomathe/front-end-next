// @/services/auth.ts
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { store } from "../store/store";
import { setAuthToken, clearAuthToken } from "../store/authSlice";
import { setUser, clearUser } from "../store/userSlice";

interface DecodedToken {
  id: number;
  name: string;
  email: string;
  roles: string[];
  blocked: boolean;
  iat: number;
  exp: number;
}

interface LoginResponse {
  accessToken: string;
}

const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode(token);
  } catch (e) {
    console.error("Failed to decode token", e);
    return null;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      { email, password },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const { accessToken } = response.data;
    const decodedToken = decodeToken(accessToken);

    if (decodedToken) {
      store.dispatch(setAuthToken(accessToken));
      store.dispatch(
        setUser({
          id: decodedToken.id,
          name: decodedToken.name,
          email: decodedToken.email,
          roles: decodedToken.roles,
        })
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Login failed", error);
    return {
      success: false,
      message: "Login failed. Please check your email and password.",
    };
  }
};

export const getAuthToken = () => {
  const state = store.getState();
  return state.auth.token;
};

export const isAuthenticated = () => {
  const state = store.getState();
  return !!state.auth.token;
};

export const performLogout = async () => {
  try {
    store.dispatch(clearAuthToken());
    store.dispatch(clearUser());
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};
