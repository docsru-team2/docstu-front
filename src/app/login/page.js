import Image from 'next/image';
import * as styles from './login.css.js';
import LoginLogo from '@public/img/logo/LoginLogo.svg';
import Link from 'next/link';
import GoogleLogo from '@public/img/btn/Google.svg';
import { LoginForm } from '@/components/LoginForm';

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.loginWrapper}>
        <Link href="/">
          <Image src={LoginLogo} alt="LoginLogo" className={styles.mediaLogo} />
        </Link>
        <LoginForm />
        <button className={styles.googleBtn}>
          <Image src={GoogleLogo} alt="GoogleLogo" />
          Google로 시작하기
        </button>
        <div className={styles.fontGroup}>
          회원이 아니신가요?{' '}
          <Link href="/join" className={styles.LinkFont}>
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
