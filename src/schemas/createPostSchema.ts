import { z } from "zod"; 

export const createPostSchema = z.object({
  title: z.string()
    .min(1, "O título é obrigatório")
    .max(50, "O título deve ter no máximo 50 caracteres"),
  content: z.string()
    .min(1, "O conteúdo é obrigatório")
    .max(270, "O conteúdo deve ter no máximo 270 caracteres"),
  image: z.string().url("Insira uma URL válida").optional().or(z.literal('')),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;