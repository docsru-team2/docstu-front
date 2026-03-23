'use client';

import Image from 'next/image';
import { Button } from '../Common/Button';
import * as styles from './LoginForm.css.js';
import eyes from '@public/img/btn/passwordIcon.svg';

export default function LoginForm() {
  return (
    <form className={styles.container}>
      <div>
        <label htmlFor="email" className={styles.label}>
          이메일
        </label>
        <input
          id="email"
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
            className={styles.input}
            placeholder="비밀번호를 입력해주세요"
            type="password"
          />
          <Image src={eyes} alt="eyes" className={styles.inputIcon} />
        </div>
      </div>
      <Button size="lg" type="submit">
        로그인
      </Button>
    </form>
  );
}
