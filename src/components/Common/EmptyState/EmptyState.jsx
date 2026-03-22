import * as styles from './EmptyState.css';

export function EmptyState({ text }) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
