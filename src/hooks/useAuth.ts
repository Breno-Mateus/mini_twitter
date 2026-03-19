import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api";
import { useAuthStore } from "../store/authStore";
import { type LoginSchema } from "../schemas/loginSchema";
import { useNavigate } from "react-router-dom";

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export function useAuth() {
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      const response = await api.post<AuthResponse>("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      setCredentials(data.user, data.token);
      navigate("/");
    },
    onError: (error) => {
      console.error("Erro ao fazer login:", error);
    },
  });

  return {
    login: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
}