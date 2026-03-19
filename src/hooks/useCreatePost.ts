import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { useAuthStore } from "../store/authStore";

export function useCreatePost() {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageImageUrl, setImageImageUrl] = useState("");

  const mutation = useMutation({
    mutationFn: async (payload: { title: string; content: string; image?: string }) => {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await api.post("/posts", payload, { headers });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTitle("");
      setContent("");
      setImageImageUrl("");
      alert("Post criado com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao criar post:", error);
      alert("Falha ao criar o post. Verifique se a URL da imagem é válida.");
    },
  });

  function submitPost() {
    if (!title.trim() || !content.trim()) {
      alert("Título e conteúdo são obrigatórios.");
      return;
    }

    const payload = {
      title,
      content,
      ...(imageImageUrl.trim() && { image: imageImageUrl.trim() })
    };

    mutation.mutate(payload);
  }

  return {
    title, setTitle,
    content, setContent,
    imageImageUrl, setImageImageUrl,
    submitPost,
    isPending: mutation.isPending,
  };
}