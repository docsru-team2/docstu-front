import * as styles from './ReasonBanner.css.js';
export default function ReasonBanner({ color, text }) {
  return <div className={styles.container({ color })}>{text}</div>;
}
