import { z } from "zod";

export const registerSchema = z.object({
  name: z
  .string()
  .min(1, "Nome é obrigatóeio")
  .min(3, "O nome deve ter no mínimo 3 caracteres")
  .max(50, "O nome deve ter no máximo 50 caracteres"),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Insira um e-mail válido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;