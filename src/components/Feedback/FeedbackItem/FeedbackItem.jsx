'use client';

import Image from 'next/image';
import userIcon from '@public/img/header/user.svg';
import * as styles from './feedbackItem.css';

export default function FeedbackItem({ data, onDelete }) {
  const { user, content, createdAt } = data;
  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.userContainer}>
        <Image src={userIcon} alt="사용자 아이콘" />

        <div className={styles.userInfo}>
          <div>{user.nickname}</div>
          <div className={styles.createdAtFont}>{createdAt}</div>
        </div>
      </div>
      <div>{content}</div>
    </div>
  );
}
