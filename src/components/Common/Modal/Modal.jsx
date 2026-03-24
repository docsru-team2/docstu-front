'use client';

import Image from 'next/image';
import * as styles from './Modal.css.js';
import closeIcon from '@public/img/btn/closeIcon.svg';
import { Button } from '@/components/Common/Button';

export function Modal({ children, onClose }) {
  const preventOverlayClick = (event) => {
    event.stopPropagation();
  };
  const handleClose = () => {
    if (!onClose) return;
    onClose();
  };
  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        onClick={preventOverlayClick}
      >
        {children}
      </div>
    </div>
  );
}

export function ConfirmModal({
  message,
  onConfirm,
  onClose,
  singleButton = true,
}) {
  return (
    <Modal onClose={onClose}>
      {/* {checkIcon} */} <p>확인아이콘</p>
      <p className={styles.modalMessage}>{message}</p>
      <div className={styles.modalActions}>
        {singleButton ? (
          <Button onClick={onConfirm}>확인</Button>
        ) : (
          <>
            <Button color="primary" size="md" onClick={onClose}>
              아니오
            </Button>
            <Button color="primary" size="md" onClick={onConfirm}>
              네
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}

export function ReasonModal({ title, placeholder, onSubmit, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const reason = e.target.reason.value;
    onSubmit?.(reason);
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <button onClick={onClose} type="button">
            <Image src={closeIcon} alt="닫기" />
          </button>
        </div>
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <label className={styles.label}>내용</label>
          <textarea
            name="reason"
            placeholder={placeholder}
            className={styles.textarea}
          />
          <Button variant="primary" size="fullWidth" type="submit">
            전송
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export function LoadDraftsModal({ data, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>임시저장 글</h3>
          <button onClick={onClose}>
            <Image src={closeIcon} alt="닫기" />
          </button>
        </div>
        <span>총 {data.length}개</span>
        <div>
          <div>
            {data.map((draft) => (
              <div key={draft.id}>
                <button>
                  <div>{draft.title}</div>
                  <div>{draft.updatedAt}</div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
