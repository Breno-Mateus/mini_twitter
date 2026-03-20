import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { useAuthStore } from "../store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreatePostSchema } from "../schemas/createPostSchema";
import { createPostSchema } from "../schemas/createPostSchema";

export function useCreatePost() {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();

  const { 
    register, 
    handleSubmit, 
    reset, 
    watch,
    formState: { errors } 
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
    }
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const imageUrl = watch("image");

  const mutation = useMutation({
    mutationFn: async (payload: { title: string; content: string; image?: string }) => {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await api.post("/posts", payload, { headers });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      reset();
      alert("Post criado com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao criar post:", error);
      alert("Falha ao criar o post. Verifique se a URL da imagem é válida.");
    },
  });

  const submitPost = (data: CreatePostSchema) => {
    mutation.mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(submitPost),
    errors,
    imageUrl,
    isPending: mutation.isPending,
  };
}