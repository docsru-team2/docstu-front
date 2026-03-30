'use client';

import Image from 'next/image';
import { Button } from '../Common/Button';
import eyes from '@public/img/btn/passwordIcon.svg';
import * as styles from './JoinForm.css.js';
import { useJoinForm } from '@/lib/hooks/useJoinForm';

export default function JoinFrom() {
  const {
    joinData,
    errors,
    handleChange,
    handleSubmit,
    setShowPassword,
    showPassword,
    showCheckPassword,
    setCheckShowPassword,
  } = useJoinForm();

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className={styles.label}>
          이메일
        </label>
        <input
          id="email"
          name="email"
          value={joinData.email}
          className={styles.input}
          placeholder="이메일을 입력해주세요"
          onChange={handleChange}
          type="email"
        />
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="nickname" className={styles.label}>
          닉네임
        </label>
        <input
          id="nickname"
          name="nickname"
          className={styles.input}
          value={joinData.nickname}
          placeholder="닉네임을 입력해주세요"
          onChange={handleChange}
        />
        {errors.nickname && (
          <p className={styles.errorText}>{errors.nickname}</p>
        )}
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
            value={joinData.password}
            placeholder="비밀번호를 입력해주세요"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
          />
          <Image
            src={eyes}
            alt="eyes"
            className={styles.inputIcon}
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        {errors.password && (
          <p className={styles.errorText}>{errors.password}</p>
        )}
      </div>
      <div>
        <label htmlFor="checkPassword" className={styles.label}>
          비밀번호 확인
        </label>
        <div className={styles.inputGroup}>
          <input
            id="checkPassword"
            name="checkPassword"
            className={styles.input}
            value={joinData.checkPassword}
            placeholder="비밀번호를 한번 더 입력해 주세요"
            type={showCheckPassword ? 'text' : 'password'}
            onChange={handleChange}
          />
          <Image
            src={eyes}
            alt="eyes"
            className={styles.inputIcon}
            onClick={() => setCheckShowPassword((prev) => !prev)}
          />
        </div>
        {errors.checkPassword && (
          <p className={styles.errorText}>{errors.checkPassword}</p>
        )}
      </div>
      <Button
        size="lg"
        type="submit"
        disabled={
          !joinData.email ||
          !joinData.nickname ||
          !joinData.password ||
          !joinData.checkPassword ||
          Object.values(errors).some(Boolean)
        }
      >
        회원가입
      </Button>
    </form>
  );
}
