'use client';

import Image from 'next/image';
import { Button } from '../Common/Button';
import * as styles from './LoginForm.css.js';
import eyes from '@public/img/btn/passwordIcon.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { publicApi } from '@/lib/fetchClient';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    try {
      const { data } = await publicApi.post('/auth/sign-in', {
        email: form.email,
        password: form.password,
      });
      document.cookie = `userType=${data.userType}; path=/`;
      router.push(
        data.userType === 'ADMIN' ? '/admin/challengesList' : '/challenge/list',
      );
    } catch (err) {
      if (err.status === 401) {
        setApiError('이메일 혹은 비밀번호가 일치하지 않습니다.');
      }
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className={styles.label}>
          이메일
        </label>
        <input
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={styles.input}
          placeholder="이메일을 입력해주세요"
          type="email"
        />
      </div>
      <div>
        <label htmlFor="password" className={styles.label}>
          비밀번호
        </label>
        <div className={styles.inputGroup}>
          <input
            id="password"
            name="password"
            className={styles.input}
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
            type={showPassword ? 'text' : 'password'}
          />
          <Image
            src={eyes}
            alt="eyes"
            className={styles.inputIcon}
            onClick={() => setShowPassword((prev) => !prev)}
            style={{ cursor: 'pointer' }}
          />
        </div>
        {apiError && <p className={styles.errorText}>{apiError}</p>}
      </div>

      <Button size="lg" type="submit" disabled={!form.email || !form.password}>
        로그인
      </Button>
    </form>
  );
}
