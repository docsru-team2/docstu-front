'use client';

import Image from 'next/image';
import userIcon from '@public/img/header/user.svg';
import * as styles from './FeedbackItem.css';
import { formatDate } from '@/utils/dateUtils';
import SimpleDropdown from '@/components/Common/SimpleDropdown/SimpleDropdown';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
    <div className={styles.feedbackContainer}>
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
            <div>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditText(content);
                }}
              >
                취소
              </button>
              <button type="button" onClick={handleUpdate}>
                수정완료
              </button>
            </div>
          ) : (
            <SimpleDropdown items={isOwner ? ownerMenuItems : adminMenuItems} />
          )}
        </div>
      )}

      <div className={styles.contentArea}>
        {isEditing ? (
          <div>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          </div>
        ) : (
          <div>{content}</div>
        )}
      </div>
    </div>
  );
}
