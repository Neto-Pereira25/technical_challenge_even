import { z } from 'zod';

export const CreateParticipantSchema = z.object({
    name: z
        .string()
        .min(3, 'O nome precisa ter no mínimo 3 caracteres')
        .max(100, 'O nome precisa ter no máximo 100 caracteres')
        .regex(
            /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/,
            'O nome deve conter apenas letras e espaços simples entre as palavras (sem acentos, números ou símbolos especiais)'
        ),
    email: z
        .string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Formato de e-mail inválido')
});

export type CreateParticipantDTO = z.infer<typeof CreateParticipantSchema>;