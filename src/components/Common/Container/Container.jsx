import clsx from 'clsx';
import * as styles from './Container.css';

export default function Container({ children, bg = 'white' }) {
  return (
    <div className={clsx(styles.wrapper, styles.wrapperBg[bg])}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
