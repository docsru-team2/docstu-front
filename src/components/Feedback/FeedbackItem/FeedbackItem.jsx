'use client';

import Image from 'next/image';
import userIcon from '@public/img/header/user.svg';
import * as styles from './FeedbackItem.css';
import { formatDate } from '@/utils/dateUtils';
import SimpleDropdown from '@/components/Common/SimpleDropdown/SimpleDropdown';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '@/components/Common/Button';

export default function FeedbackItem({
  data,
  currentUser,
  onUpdate,
  onDelete,
}) {
  const { id, user, content, createdAt } = data;

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(content);

  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');
  const isOwner = currentUser?.id === user?.id;

  const ownerMenuItems = [
    { key: 'edit', label: '수정하기', action: () => setIsEditing(true) },
    { key: 'delete', label: '삭제하기', action: () => onDelete?.(id) },
  ];
  const adminMenuItems = [
    { key: 'delete', label: '삭제하기', action: () => onDelete?.(data) },
  ];

  if (!data) return null;
  const handleUpdate = () => {
    if (!onUpdate) return;
    onUpdate({
      id,
      content: editText,
    });
    setIsEditing(false);
  };

  return (
    <div
      className={clsx(styles.feedbackContainer, {
        [styles.editingFeedbackContainer]: isEditing,
      })}
    >
      <div className={styles.userContainer}>
        <Image src={userIcon} alt="사용자 아이콘" />

        <div className={styles.userInfo}>
          <div>{user?.nickname}</div>
          <div className={styles.createdAtFont}>
            {createdAt ? formatDate(createdAt, 'shortDatetime') : ''}
          </div>
        </div>
      </div>

      {(isOwner || isAdmin) && (
        <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <div className={styles.buttonWrapper}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  setIsEditing(false);
                  setEditText(content);
                }}
              >
                취소
              </button>
             <div className={styles.editButton}>
              <Button color='primary' size='sm' type="button" onClick={handleUpdate} >
                수정완료
              </Button>
              </div>

            </div>
          ) : (
            <SimpleDropdown items={isOwner ? ownerMenuItems : adminMenuItems} />
          )}
        </div>
      )}

      <div>
        {isEditing ? (
          <div>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className={styles.editTextarea}
            />
          </div>
        ) : (
          <div>{content}</div>
        )}
      </div>
    </div>
  );
}
