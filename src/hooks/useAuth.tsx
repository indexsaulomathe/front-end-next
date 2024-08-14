// @/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuthToken } from "@/services/auth";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          router.push("/login");
          return;
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { loading };
};

export default useAuth;
