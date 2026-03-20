import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { useAuthStore } from "../store/authStore";
import { AxiosError } from "axios";
import { createPostSchema, type CreatePostSchema } from "../schemas/createPostSchema";

export function useEditPost(postId: number | string, initialData: CreatePostSchema) {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: initialData,
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const imageUrl = watch("image");

  const mutation = useMutation({
    mutationFn: async (data: CreatePostSchema) => {
      const headers = { Authorization: `Bearer ${token}` };
      
      const payload = {
        title: data.title,
        content: data.content,
        ...(data.image && data.image.trim() !== "" ? { image: data.image.trim() } : { image: null })
      };

      await api.put(`/posts/${postId}`, payload, { headers }); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsEditing(false);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 403) {
        alert("Acesso Negado (403): Você não tem permissão para editar este post.");
      } else {
        alert("Ocorreu um erro ao tentar salvar a edição.");
      }
    }
  });

  function startEditing() { 
    setIsEditing(true); 
  }

  function cancelEditing() {
    reset(initialData); 
    setIsEditing(false);
  }

  function submitEdit(data: CreatePostSchema) { 
    mutation.mutate(data); 
  }

  return {
    isEditing, startEditing, cancelEditing,
    register, handleSubmit: handleSubmit(submitEdit), errors, imageUrl,
    isPending: mutation.isPending,
  };
}