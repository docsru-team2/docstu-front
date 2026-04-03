'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image.js';
import * as styles from './DescriptionBtn.css.js';
import Button from '@/components/Common/Button/Button.jsx';
import { api } from '@/lib/fetchClient';

export default function DescriptionBtn({
  challengeId,
  date,
  maxParticipants,
  count,
  personIcon,
  clockIcon,
  isClosed,
  sourceUrl,
  isParticipant,
}) {
  const router = useRouter();
  console.log(count);
  const handleChallenge = async () => {
    try {
      await api.post(`/challenges/${challengeId}/participants`);
      router.push(`/translations/${challengeId}`);
    } catch (e) {
      console.error('참가 신청 실패:', e);
    }
  };

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
        <Button
          size="md"
          disabled={isClosed}
          href={
            isParticipant && !isClosed
              ? `/translations/${challengeId}`
              : undefined
          }
          onClick={!isParticipant && !isClosed ? handleChallenge : undefined}
        >
          {isParticipant ? '도전 계속하기' : '작업 도전하기'}
        </Button>
      </div>
    </div>
  );
}
