import Image from 'next/image.js';
import * as styles from './DescriptionBtn.css.js';
import Button from '@/components/Common/Button/Button.jsx';
export default function DescriptionBtn({
  date,
  maxParticipants,
  count,
  personIcon,
  clockIcon,
  progressStatus,
  sourceUrl,
  isParticipant,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.infoGroup}>
        <div className={styles.infoItem}>
          <Image src={clockIcon} alt="clockIcon" />
          {date} 마감
        </div>
        <div className={styles.infoItem}>
          <Image src={personIcon} alt="personIcon" />
          {`${count}/${maxParticipants}`}
        </div>
      </div>
      <div className={styles.btnWithMargin}>
        <Button size="md" color="viewOriginal" href={sourceUrl}>
          원문보기
        </Button>
      </div>
      <div className={styles.btn}>
        <Button size="md" disabled={progressStatus === 'CLOSED'}>
          {isParticipant ? '도전 계속하기' : '작업 도전하기'}
        </Button>
      </div>
    </div>
  );
}
