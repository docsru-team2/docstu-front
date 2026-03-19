import Image from 'next/image';
import * as styles from './AdminHeader.css';
import headerLogo from '@public/img/logo/headerLogo.svg';
import adminProfile from '@public/img/header/admin.svg';
import AdminNav from './AdminNav';
import Link from 'next/link';

export default function AdminHeader() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.navGroup}>
          <Link href={'/admin/challengesSettings'}>
            <Image src={headerLogo} alt="headerLogo" />
          </Link>
          <AdminNav />
        </div>
        <Image src={adminProfile} alt="adminProfile" />
      </div>
    </header>
  );
}
