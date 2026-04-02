'use client';

import arrowLeftActive from '@public/img/arrow/arrowLeftActive.svg';
import arrowLeftInactive from '@public/img/arrow/arrowLeftInactive.svg';
import arrowRightActive from '@public/img/arrow/arrowRightActive.svg';
import arrowRightInactive from '@public/img/arrow/arrowRightInactive.svg';
import * as styles from './Pager.css';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Pager({ totalCount }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawPage = Number(searchParams.get('page'));
  const page = !rawPage || rawPage < 1 ? 1 : rawPage;
  const safeTotalCount = Number(totalCount) || 0;
  const totalPages = Math.ceil(safeTotalCount / 5);
  if (totalCount <= 5) return null;
  const setPage = (p) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', p);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className={styles.pagerContainer}>
      <div className={styles.pager}>
        <span className={styles.activePageNum}>{page}</span>
        {' / '}
        <span>{totalPages}</span>
      </div>

      <button
        className={styles.pagerButton}
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <Image
          src={page === 1 ? arrowLeftInactive : arrowLeftActive}
          alt="이전"
        />
      </button>

      <button
        className={styles.pagerButton}
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        <Image
          src={page === totalPages ? arrowRightInactive : arrowRightActive}
          alt="다음"
        />
      </button>
    </div>
  );
}
