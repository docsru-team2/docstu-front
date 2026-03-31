import { z } from 'zod';

export const challengeSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  sourceUrl: z
    .string()
    .min(1, '원문링크를 입력해주세요')
    .url('올바른 URL 형식을 입력해주세요'),
  field: z
    .string()
    .nullable()
    .refine((v) => !!v, '분야를 선택해주세요'),
  documentType: z
    .string()
    .nullable()
    .refine((v) => !!v, '문서 타입을 선택해주세요'),
  deadline: z
    .string()
    .nullable()
    .refine((v) => !!v, '마감일을 선택해주세요'),
  maxParticipants: z
    .string()
    .min(1, '최대인원을 입력해주세요')
    .regex(/^\d+$/, '숫자만 입력해주세요'),
  description: z.string().min(1, '내용을 입력해주세요'),
});
