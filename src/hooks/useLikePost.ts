import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api";
import { useAuthStore } from "../store/authStore";

interface UseLikePostParams {
  postId: number | string;
  initialLikesCount: number;
}

export function useLikePost({ postId, initialLikesCount }: UseLikePostParams) {
  const token = useAuthStore((state) => state.token);
  const [isLiked, setIsLiked] = useState(false); 
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const likeMutation = useMutation({
    mutationFn: async () => {
      const headers = { Authorization: `Bearer ${token}` };
      await api.post(`/posts/${postId}/like`, {}, { headers });
    },
    onError: (error) => {
      setIsLiked(false);
      setLikesCount(initialLikesCount);
      console.error("Erro ao processar a curtida:", error);
    }
  });

  function handleLikeClick() {
    if (!token) {
      alert("Você precisa estar logado para curtir um post.");
      return;
    }

    likeMutation.mutate();
    setIsLiked(!isLiked);
    setLikesCount(!isLiked ? likesCount + 1 : likesCount - 1);
  }

  return {
    isLiked,
    likesCount,
    handleLikeClick,
  };
}