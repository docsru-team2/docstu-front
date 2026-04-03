'use client';

import { useState } from 'react';
import Image from 'next/image';
import * as styles from './OriginalViewer.css.js';
import ic_list from '@public/img/ic_list.svg';
import Button from '@/components/Common/Button/Button.jsx';
import iconCLick from '@public/img/arrow/iconClick.svg';
const DEFAULT_URL =
  'https://nextjs.org/docs/app/building-your-application/routing';

export default function OriginalViewer({ sourceUrl = DEFAULT_URL }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.floatingBtn}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image src={ic_list} alt="원문" />
        <span className={styles.floatingLabel}>원문</span>
      </button>

      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <div className={styles.openBtnWrapper}>
              <Button
                size="md"
                color="opacity"
                hasIcon={iconCLick}
                href={sourceUrl}
                target="_blank"
              >
                링크 열기
              </Button>
            </div>
          </div>
          <div className={styles.iframeWrapper}>
            <iframe
              src={`/api/proxy?url=${encodeURIComponent(sourceUrl)}`}
              className={styles.iframe}
            />
          </div>
        </div>
      )}
    </>
  );
}
