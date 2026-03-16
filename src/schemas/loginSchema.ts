import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Insira um e-mail válido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;