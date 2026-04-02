'use client';

import Image from 'next/image';
import userIcon from '@public/img/header/user.svg';
import * as styles from './FeedbackItem.css';
import { formatDate } from '@/utils/dateUtils';
import SimpleDropdown from '@/components/Common/SimpleDropdown/SimpleDropdown';
import { usePathname } from 'next/navigation';

export default function FeedbackItem({ data, onDelete }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');

  if (!data) return null;
  const { user, content, createdAt } = data;

  const menuItems = [
    { key: 'delete', label: '삭제하기', action: () => onDelete?.(data) },
  ];

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.userContainer}>
        <Image src={userIcon} alt="사용자 아이콘" />

        <div className={styles.userInfo}>
          <div>{user.nickname}</div>
          <div className={styles.createdAtFont}>
            {formatDate(createdAt, 'shortDatetime')}
          </div>
        </div>
      </div>
      {isAdmin && (
        <div
          className={styles.menu}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <SimpleDropdown items={menuItems} />
        </div>
      )}
      <div>{content}</div>
    </div>
  );
}
