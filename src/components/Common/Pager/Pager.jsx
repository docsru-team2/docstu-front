'use client';

import arrowLeftActive from '@public/img/arrow/arrowLeftActive.svg';
import arrowLeftInactive from '@public/img/arrow/arrowLeftInactive.svg';
import arrowRightActive from '@public/img/arrow/arrowRightActive.svg';
import arrowRightInactive from '@public/img/arrow/arrowRightInactive.svg';
import * as styles from './Pager.css';
import Image from 'next/image';

export default function Pager({ page, totalPages, setPage }) {
  return (

    //page, totalPages, setPage
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
          src={
            page === totalPages
              ? arrowRightInactive
              : arrowRightActive
          }
          alt="다음"
        />
      </button>
    </div>
  );
}
