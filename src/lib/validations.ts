import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "O nome completo deve ter pelo menos 3 caracteres")
      .max(100, "O nome completo é muito longo"),

    email: z.email("E-mail inválido").toLowerCase(),

    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número")
      .regex(/[\W_]/, "A senha deve conter pelo menos um caractere especial"),

    confirmPassword: z.string().min(1, "Confirme sua senha"),

    phone: z.object({
      ddi: z.string().regex(/^\+?\d{1,3}$/, "DDI inválido (ex: +55)"), // aceita + opcional
      ddd: z.string().regex(/^\d{2}$/, "DDD inválido (ex: 11)"), // dois dígitos
      number: z
        .string()
        .regex(/^[9]?\d{4}-?\d{4}$/, "Número inválido (ex: 98765-4321)"), // 8 ou 9 dígitos, opcional 9 inicial
    }),

    state: z
      .enum(
        [
          "AC",
          "AL",
          "AP",
          "AM",
          "BA",
          "CE",
          "DF",
          "ES",
          "GO",
          "MA",
          "MT",
          "MS",
          "MG",
          "PA",
          "PB",
          "PR",
          "PE",
          "PI",
          "RJ",
          "RN",
          "RS",
          "RO",
          "RR",
          "SC",
          "SP",
          "SE",
          "TO",
        ],
        { message: "Estado inválido" }
      )
      .describe("Unidade federativa (UF) do Brasil"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("E-mail inválido")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(128, "A senha é muito longa"),
});

export const bookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "O título deve ter pelo menos 2 caracteres")
    .max(100, "O título é muito longo"),

  author: z
    .string()
    .trim()
    .min(2, "O nome do autor deve ter pelo menos 2 caracteres")
    .max(100, "O nome do autor é muito longo"),

  genre: z
    .string()
    .trim()
    .min(2, "O gênero deve ter pelo menos 2 caracteres")
    .max(50, "O gênero é muito longo"),

  condition: z.enum(["Novo", "Usado", "Danificado"] as const, {
    message: "A condição deve ser 'Novo', 'Usado' ou 'Danificado'",
  }),

  summary: z
    .string()
    .trim()
    .min(10, "O resumo deve ter pelo menos 10 caracteres")
    .max(1000, "O resumo é muito longo"),

  donorComment: z
    .string()
    .trim()
    .max(500, "O comentário do doador deve ter no máximo 500 caracteres")
    .optional(),

  totalCopies: z.coerce
    .number()
    .int("O número de cópias deve ser um inteiro")
    .positive("O número de cópias deve ser positivo")
    .lte(10000, "Número de cópias muito alto"),

  coverUrls: z
    .array(
      z
        .string()
        .url("URL de capa inválida")
        .nonempty("A URL da capa não pode estar vazia")
    )
    .min(1, "Pelo menos uma imagem de capa é obrigatória")
    .max(5, "No máximo 5 imagens de capa"),
});
