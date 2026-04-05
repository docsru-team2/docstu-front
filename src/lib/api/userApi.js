import { cache } from 'react';
import { api } from '@/lib/fetchClient';

export const getMe = cache(async () => {
  return api.get('/auth/me');
});
