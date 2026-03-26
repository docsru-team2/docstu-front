'use client';
import deadlineClock from '@public/img/challengeCard/deadlineClock.svg';
import clock from '@public/img/challengeCard/clock.svg';
import fullPerson from '@public/img/challengeCard/fullPerson.svg';
import person from '@public/img/challengeCard/person.svg';
import { formatDate } from '@/utils/dateUtils';
import { Badge } from '../../Common/Badge';
import { FIELD_MAP, DOCUMENT_TYPE_MAP } from '@/constants/challengeConstants';
import Image from 'next/image';
import { cardContainer } from './ChallengeCard.css';
import * as styles from './ChallengeCard.css';
import SimpleDropdown from '@/components/Common/SimpleDropdown/SimpleDropdown';
import { usePathname } from 'next/navigation';

export default function ChallengeCard({ data }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');

  if (!data) return null;

  const {
    id,
    title,
    field,
    documentType,
    deadline,
    currentParticipants,
    maxParticipants,
  } = data;
  const fieldInfo = FIELD_MAP[field];
  const isClosedFull = currentParticipants >= maxParticipants;
  const isClosedExpired = new Date() > new Date(deadline);

  const menuItems = [
    { key: 'edit', label: '수정하기', action: () => console.log('수정', id) },
    { key: 'delete', label: '삭제하기', action: () => console.log('삭제', id) },
  ];

  return (
    <div className={cardContainer}>
      <div>
        {isClosedExpired ? (
          <div style={{ marginBottom: '12px' }}>
            <Badge badgeStyle="closedStatus" color="closedExpired">
              <div className={styles.badgeInner}>
                <Image src={deadlineClock} alt="챌린지 마감" />
                챌린지가 마감되었어요
              </div>
            </Badge>
          </div>
        ) : isClosedFull ? (
          <div style={{ marginBottom: '12px' }}>
            <Badge badgeStyle="closedStatus" color="closedFull">
              <div className={styles.badgeInner}>
                <Image src={fullPerson} alt="모집완료" />
                모집이 완료된 상태에요
              </div>
            </Badge>
          </div>
        ) : null}
      </div>
      {isAdmin && (
        <div className={styles.menu}>
          <SimpleDropdown items={menuItems} />
        </div>
      )}
      <div>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.badgeContainer}>
          <Badge badgeStyle="field" color={fieldInfo?.color}>
            {fieldInfo?.label}
          </Badge>
          <Badge badgeStyle="documentType">
            {DOCUMENT_TYPE_MAP[documentType]}
          </Badge>
        </div>
      </div>

      <div className={styles.divider}></div>
      <div className={styles.currentStatusContainer}>
        <div className={styles.statusGroup}>
          <div className={styles.currentStatus}>
            <Image src={clock} alt="마감날짜" />
            {formatDate(deadline, 'ko')} 마감
          </div>
          <div className={styles.currentStatus}>
            <Image src={person} alt="참여인원" />
            {currentParticipants} / {maxParticipants} 참여중
          </div>
        </div>
        <div>zz</div>
        {/* 도전 계속하기 / 내 작업물 보기 버튼 추가 */}
      </div>
    </div>
  );
}
