import Image from 'next/image';
import * as styles from './EmptyState.css';
import emptyState from '@public/img/emptyState.svg'

export function EmptyState({ text }) {
  return (
    <div className={styles.container}>
      <Image
        src={emptyState}
        alt="비어 있음"
      />
      <p className={styles.text}>{text}</p>
    </div>
  );
}
