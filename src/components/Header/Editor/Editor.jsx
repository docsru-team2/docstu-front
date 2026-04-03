'use client';

import Image from 'next/image';
import * as styles from './EditorHeadear.css.js';
import headerLogo from '@public/img/logo/headerLogo.svg';
import Link from 'next/link.js';
import Button from '@/components/Common/Button/Button.jsx';
import Frame from '@public/img/Frame.svg';

export default function EditorHeader({ userType, isParticipant = false, onSaveDraft, onSubmit }) {
  const isEdit = userType === 'ADMIN' || isParticipant;
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
        <div className={styles.btnGroup}>
          {userType !== 'ADMIN' && (
            <>
              <div className={styles.FrameBtn}>
                <Button size="md" color="abandon" hasIcon={Frame}>
                  포기
                </Button>
              </div>
              <div className={styles.submitBtn}>
                <Button size="md" color="secondary" onClick={onSaveDraft}>
                  임시저장
                </Button>
              </div>
            </>
          )}
          <div className={styles.submitBtn}>
            <Button size="md" color="primary" onClick={onSubmit}>
              {isEdit ? '수정하기' : '제출하기'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
