import * as styles from './ReasonContent.css.js';

export default function ReasonContent({ title, content, date }) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.titleText}>{title}</div>
        <div className={styles.contentText}>{content}</div>
        <div className={styles.dateText}>{date}</div>
      </div>
      <div className={styles.underLine} />
    </div>
  );
}
