'use client';

import Image from 'next/image';
import * as styles from './Modal.css.js';
import closeIcon from '@public/img/btn/closeIcon.svg';
import { Button } from '@/components/Common/Button';
import checkIcon from '@public/img/checkIcon.svg';
import { formatDate } from '@/utils/dateUtils.js';

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
      <div className={styles.modalMessage}>
        <Image src={checkIcon} alt="확인아이콘" />
        <p>{message}</p>
      </div>
      <div className={styles.modalActions}>
        {singleButton ? (
          <div className={styles.modalButton}>
            <Button onClick={onConfirm}>확인</Button>
          </div>
        ) : (
          <>
            <div className={styles.modalButton}>
              <Button color="secondary" size="md" onClick={onClose}>
                아니오
              </Button>
            </div>
            <div className={styles.modalButton}>
              <Button color="primary" size="md" onClick={onConfirm}>
                네
              </Button>
            </div>
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
          <Button variant="primary" size="lg" type="submit">
            전송
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export function LoadDraftsModal({ data, onClose, onSelectDraft }) {
  const handleSelectDraft = (draft) => {
    onSelectDraft?.(draft);
    onClose?.();
  };
  return (
    <Modal onClose={onClose}>
      <div>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>임시저장 글</h3>
          <button type="button" onClick={onClose}>
            <Image src={closeIcon} alt="닫기" />
          </button>
        </div>

        <ul className={styles.draftsList}>
          <span className={styles.draftsCount}>총 {data.length}개</span>
          {data.map((draft) => (
            <li key={draft.id} className={styles.draft}>
              <button
                type="button"
                onClick={() => handleSelectDraft(draft)}
                className={styles.draftButton}
              >
                <div>{draft.title}</div>
                <div className={styles.date}> {formatDate(draft.updatedAt, 'dot') }</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
