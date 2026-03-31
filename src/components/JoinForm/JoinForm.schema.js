import { z } from 'zod';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export const joinSchema = z
  .object({
    email: z.email('유효한 이메일 형식이 아닙니다.'),
    password: z
      .string({ error: '비밀번호는 필수입니다.' })
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(passwordRegex, '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.'),
    nickname: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
    checkPassword: z.string(),
  })
  .refine((data) => data.password === data.checkPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['checkPassword'],
  });
