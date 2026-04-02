'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { useNotification } from '@/lib/hooks/useNotification';
import bell from '@public/img/header/bell.svg';
import Image from 'next/image';
import * as styles from './Notification.css.js';
import { ConfirmModal } from '@/components/Common/Modal';

export default function Notification() {
  const {
    notifications,
    unreadCount,
    hasMore,
    isLoading,
    loadMore,
    markAsRead,
    markAllAsRead,
    markDelete,
    markAllDelete,
    successMessage,
    closeSuccessModal,
  } = useNotification();

  // 스크롤 끝 감지
  const observerRef = useRef(null);
  const bottomRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node) return;

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      observerRef.current.observe(node);
    },
    [hasMore, loadMore],
  );


  const [open, setOpen] = useState(false);
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

  const handleList = () => {
    setOpen(!open);
  };

  const [modalMode, setModalMode] = useState(null);
  const MODAL_CONFIG = {
    allRead: {
      message: '알림을 모두 읽겠습니까?',
      onConfirm: markAllAsRead,
    },
    allDelete: {
      message: '알림을 모두 삭제하겠습니까?',
      onConfirm: markAllDelete,
    },
  };

  const handleCloseModal = () => {
    closeSuccessModal();
    setModalMode(null);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div onClick={handleList}>
        <Image src={bell} alt="bell" />
        {unreadCount > 0 && <div className={styles.unreadCount}>N</div>}
      </div>
      {open && (
        <section>
          <div className={styles.menu}>
            <h1>
              알림 <i>{unreadCount}</i>
            </h1>

            <div className={styles.tab}>
              {unreadCount > 0 && (
                <button onClick={() => setModalMode('allRead')}>
                  전체 읽음
                </button>
              )}
              {notifications.length > 0 && (
                <button onClick={() => setModalMode('allDelete')}>
                  전체 삭제
                </button>
              )}
            </div>
          </div>

          {/* 알림 목록 */}
          <ul className={styles.list}>
            {notifications.map((n) => {
              const dateOnly = new Date(n.createdAt).toISOString().slice(0, 10);
              return (
                <li
                  key={n.id}
                  onClick={n.isRead ? null : () => markAsRead(n.id)}
                  className={n.isRead ? styles.active : ''}
                >
                  <span>{n.content}</span>
                  <span className={styles.dateCheck}>{dateOnly}</span>
                  <i
                    onClick={() => markDelete(n.id)}
                    className={styles.deleteOne}
                  >
                    X
                  </i>
                </li>
              );
            })}
            {isLoading && <p>불러오는 중...</p>}
            {!hasMore && (
              <p className={styles.allCheck}>
                받은 알림을 모두 확인하셨습니다.
              </p>
            )}
          </ul>
          <div ref={bottomRef} style={{ height: '1px' }} />
        </section>
      )}

      {/* 알림 모달 */}
      {modalMode && MODAL_CONFIG[modalMode] && (
        <ConfirmModal
          message={MODAL_CONFIG[modalMode].message}
          onConfirm={MODAL_CONFIG[modalMode].onConfirm}
          onClose={() => setModalMode(null)}
          singleButton={false}
        />
      )}

      {successMessage && (
        <ConfirmModal
          message={successMessage}
          onConfirm={handleCloseModal}
          onClose={handleCloseModal}
          singleButton={true}
        />
      )}
    </div>
  );
}
