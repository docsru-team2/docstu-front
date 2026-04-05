import Image from 'next/image';
import * as styles from './AdminHeader.css';
import headerLogo from '@public/img/logo/headerLogo.svg';
import AdminNav from './AdminNav';
import Link from 'next/link';
import { getMe } from '@/lib/api/userApi';
import UserInfo from '@/components/UserInfo/UserInfo';

export default async function AdminHeader() {
  const userData = await getMe();
  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.navGroup}>
          <Link href={'/admin/challengesSettings'}>
            <Image src={headerLogo} alt="headerLogo" priority />
          </Link>
          <AdminNav />
        </div>

        <UserInfo userData={userData} />
      </div>
    </header>
  );
}
