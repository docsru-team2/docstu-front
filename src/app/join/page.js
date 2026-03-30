import Image from 'next/image';
import * as styles from './join.css.js';
import LoginLogo from '@public/img/logo/LoginLogo.svg';
import Link from 'next/link';
import { JoinForm } from '@/components/JoinForm/index.js';
import GoogleLoginButton from '@/components/JoinForm/GoogleLoginButton.jsx';

export default function UserJoin() {
  return (
    <div className={styles.container}>
      <div className={styles.loginWrapper}>
        <Link href="/">
          <Image src={LoginLogo} alt="LoginLogo" className={styles.mediaLogo} />
        </Link>
        <JoinForm />
        <GoogleLoginButton />
        <div className={styles.fontGroup}>
          회원이신가요?{' '}
          <Link href="/" className={styles.LinkFont}>
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
