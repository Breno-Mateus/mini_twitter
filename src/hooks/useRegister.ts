import { useMutation } from "@tanstack/react-query";
import type { RegisterSchema } from "../schemas/registerSchema";
import { api } from "../services/api";
import { isAxiosError } from "axios";

interface RegisterResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export function useRegister() {
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterSchema) => {
      const response = await api.post<RegisterResponse>("/auth/register", data);
      return response.data;
    },
    onSuccess: () => {
      console.log("Usuário cadastrado com sucesso!"); 
    },
    onError: (error) => {
      console.error("Falha na requisição:", error);
    },
  });

  return {
    registerUser: registerMutation.mutateAsync,
    isLoading: registerMutation.isPending,
    errorMessage: isAxiosError(registerMutation.error) && registerMutation.error.response?.status === 400 
      ? "Este e-mail já está em uso. Tente fazer login!" 
      : registerMutation.isError 
        ? "Ocorreu um erro inesperado. Tente novamente mais tarde." 
        : null
  }
}