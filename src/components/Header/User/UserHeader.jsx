import Image from 'next/image';
import * as styles from './UserHeader.css.js';
import headerLogo from '@public/img/logo/headerLogo.svg';
import bell from '@public/img/header/bell.svg';
import userProfile from '@public/img/header/user.svg';
import Link from 'next/link.js';
import Button from '@/components/Common/Button/Button.jsx';

export default function UserHeader() {
  const isLoggedIn = false;
  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        <Link href={'/'}>
          <Image src={headerLogo} alt="headerLogo" className={styles.logo} />
        </Link>

        {!isLoggedIn ? (
          <div className={styles.btnWrapper}>
            <Button href="/login" size="md" color="secondary">
              로그인
            </Button>
          </div>
        ) : (
          <div className={styles.loginProfieGroup}>
            <Image src={bell} alt="bell" />
            <Image src={userProfile} alt="userProfile" />
          </div>
        )}
      </div>
    </header>
  );
}
