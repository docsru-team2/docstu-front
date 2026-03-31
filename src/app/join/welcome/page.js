import { Button } from '@/components/Common/Button';
import * as styles from './welcome.css.js';

import Image from 'next/image.js';
import logo from '@public/img/logo/LoginLogo.svg';

export default function WelcomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.welcomWrapper}>
        <Image src={logo} alt="logo" />
        <div className={styles.fontGroup}>회원가입을 축하합니다.</div>
        <div className={styles.btnWrapper}>
          <Button href="/login" size="md">
            로그인 하러가기
          </Button>
        </div>
      </div>
    </div>
  );
}
