'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as styles from './AdminHeader.css';

const NAV_ITEMS = [
  { label: '챌린지 관리', href: '/admin/challengesSettings' },
  { label: '챌린지 목록', href: '/admin/challengesList' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      {NAV_ITEMS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={pathname.includes(href) ? styles.active : ''}
        >
          {label}
        </Link>
      ))}
    </>
  );
}
