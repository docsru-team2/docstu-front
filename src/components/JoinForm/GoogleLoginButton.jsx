'use client';

import Image from 'next/image';
import GoogleLogo from '@public/img/btn/Google.svg';
import * as styles from '../../app/join/join.css.js';

export default function GoogleLoginButton() {
  const handleSnsJoin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/social/google/sign-in`;
  };

  return (
    <button className={styles.googleBtn} onClick={handleSnsJoin}>
      <Image src={GoogleLogo} alt="GoogleLogo" />
      Google로 시작하기
    </button>
  );
}
