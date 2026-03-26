'use client';

import arrowLeftActive from '@public/img/arrow/arrowLeftActive.svg';
import arrowLeftInactive from '@public/img/arrow/arrowLeftInactive.svg';
import arrowRightActive from '@public/img/arrow/arrowRightActive.svg';
import arrowRightInactive from '@public/img/arrow/arrowRightInactive.svg';
import clsx from 'clsx';
import * as styles from './PaginationBar.css';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaginationBar({ totalCount }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const totalPages = Math.ceil(totalCount / 10);

  const setPage = (p) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', p);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const maxVisiblePages = 5;
  let startPage;

  if (totalPages <= maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(page - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPages - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPages - startPage + 1) },
    (_, i) => startPage + i,
  );

  return (
    <div className={styles.paginationBar}>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={styles.paginationArrowButton}
      >
        <Image src={page > 1 ? arrowLeftActive : arrowLeftInactive} alt="이전" />
      </button>

      <div className={styles.numberButtons}>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={clsx(
              styles.paginationButton,
              page === p && styles.paginationButtonActive,
            )}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={styles.paginationArrowButton}
      >
        <Image src={page < totalPages ? arrowRightActive : arrowRightInactive} alt="다음" />
      </button>
    </div>
  );
}
