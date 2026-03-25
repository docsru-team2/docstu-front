'use client';
import pluse from '@public/img/btn/plus.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import * as styles from './TabMenu.css';
import { Button } from '@/components/Common/Button';

export default function TabMenu() {
  const pathname = usePathname();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <div className={styles.titleText}>나의 챌린지</div>
          <div className={styles.btnGroup}>
            <Button size="md" roundBtn hasIcon={pluse}>
              신규 챌린지 신청
            </Button>
          </div>
        </div>
          <ul className={styles.tabContainer}>
            <li
              className={clsx(styles.tab, {
                [styles.active]: pathname === '/myChallenge/ongoing',
              })}
            >
              <Link href="/myChallenge/ongoing">참여중인 챌린지</Link>
            </li>

            <li
              className={clsx(styles.tab, {
                [styles.active]: pathname === '/myChallenge/completed',
              })}
            >
              <Link href="/myChallenge/completed">완료한 챌린지</Link>
            </li>

            <li
              className={clsx(styles.tab, {
                [styles.active]: pathname === '/myChallenge/applied',
              })}
            >
              <Link href="/myChallenge/applied">신청한 챌린지</Link>
            </li>
          </ul>
        </div>
    </>
  );
}
