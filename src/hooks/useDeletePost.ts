import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { useAuthStore } from "../store/authStore";
import { AxiosError } from "axios";

export function useDeletePost(postId: number | string) {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await api.delete(`/posts/${postId}`, { headers });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 403) {
        alert("Acesso Negado (403): Você não tem permissão para excluir este post.");
      } else {
        alert("Ocorreu um erro ao tentar excluir o post.");
      }
    }
  });
}