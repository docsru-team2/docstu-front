'use client';
import userProfile from '@public/img/header/user.svg';
import adminProfile from '@public/img/header/admin.svg';
import Image from 'next/image';
import * as styles from './UserInfo.css.js';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link.js';
import { useRouter } from 'next/navigation';
import { publicApi } from '@/lib/fetchClient';

export default function UserInfo({ userData }) {
  const { userType, nickname, grade } = userData;
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await publicApi.post('/auth/logout');
    document.cookie = 'userType=; path=/; max-age=0';
    setOpen(false);
    router.push('/');
    router.refresh();
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  const containerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className={styles.container} ref={containerRef}>
      {userType === 'USER' ? (
        <Image src={userProfile} alt="userProfile" onClick={handleOpen} />
      ) : (
        <Image src={adminProfile} alt="adminProfile" onClick={handleOpen} />
      )}

      {open && (
        <div className={styles.menuWrapper}>
          <div className={styles.userInfoGroup}>
            {userType === 'USER' ? (
              <Image src={userProfile} alt="userProfile" />
            ) : (
              <Image src={adminProfile} alt="adminProfile" />
            )}
            <div className={styles.fontGroup}>
              <div className={styles.nicknameFont}>{nickname}</div>
              {userType === 'USER' ? (
                <div className={styles.gradeFont}>
                  {grade === 'NORMAL' ? '일반 회원' : '전문가'}
                </div>
              ) : (
                <div className={styles.gradeFont}>관리자</div>
              )}
            </div>
          </div>
          <div className={styles.divider} />
          {userType === 'USER' && (
            <Link
              href="/myChallenge/ongoing"
              className={styles.menuFont}
              onClick={() => setOpen(false)}
            >
              나의 챌린지
            </Link>
          )}
          <div className={styles.logOutFont} onClick={handleLogout}>
            로그아웃
          </div>
        </div>
      )}
    </div>
  );
}
