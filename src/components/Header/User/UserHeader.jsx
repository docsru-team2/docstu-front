import Image from 'next/image';
import * as styles from './UserHeader.css.js';
import headerLogo from '@public/img/logo/headerLogo.svg';
import userProfile from '@public/img/header/user.svg';
import Link from 'next/link.js';
import Button from '@/components/Common/Button/Button.jsx';
import Notification from '@/components/Notification/Notification.jsx';
import { cookies } from 'next/headers';
import UserInfo from '@/components/UserInfo/UserInfo.jsx';
import { api } from '@/lib/fetchClient.js';

export default async function UserHeader() {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get('refreshToken')?.value;
  const userData = isLoggedIn ? await api.get('/auth/me') : null;

  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        <Link href={'/challenge/list'}>
          <Image
            src={headerLogo}
            alt="headerLogo"
            className={styles.logo}
            priority
          />
        </Link>

        {isLoggedIn ? (
          <div className={styles.loginProfieGroup}>
            <Notification />
            <UserInfo userData={userData} />
          </div>
        ) : (
          <div className={styles.btnWrapper}>
            <Button href="/login" size="md" color="secondary">
              로그인
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
