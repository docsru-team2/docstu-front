'use client';

import Image from 'next/image';
import { Button } from '../Common/Button';
import eyes from '@public/img/btn/passwordIcon.svg';
import * as styles from './JoinForm.css.js';

export default function JoinFrom() {
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
        <label htmlFor="nickName" className={styles.label}>
          닉네임
        </label>
        <input
          id="nickName"
          className={styles.input}
          placeholder="닉네임을 입력해주세요"
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
      <div>
        <label htmlFor="checkPassword" className={styles.label}>
          비밀번호 확인
        </label>
        <div className={styles.inputGroup}>
          <input
            id="checkPassword"
            className={styles.input}
            placeholder="비밀번호를 한번 더 입력해 주세여"
            type="password"
          />
          <Image src={eyes} alt="eyes" className={styles.inputIcon} />
        </div>
      </div>
      <Button size="lg" type="submit">
        회원가입
      </Button>
    </form>
  );
}
