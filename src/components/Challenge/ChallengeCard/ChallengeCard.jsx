'use client'
import deadlineClock from '@public/img/challengeCard/deadlineClock.svg';
import clock from '@public/img/challengeCard/clock.svg';
import fullPerson from '@public/img/challengeCard/fullPerson.svg';
import person from '@public/img/challengeCard/person.svg';
import menu from '@public/img/btn/menu.svg';
import { formatDate } from '@/utils/dateUtils';
import { Badge } from '../../Common/Badge';
import { FIELD_MAP, DOCUMENT_TYPE_MAP } from '@/constants/challengeConstants';
import Image from 'next/image';
import { cardContainer } from './ChallengeCard.css';
import * as styles from './ChallengeCard.css';

export default function ChallengeCard({ data }) {
  if (!data) return null;

  const {
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

  return (
    <div className={cardContainer}>
      <div>
        {isClosedExpired ? (
          <Badge badgeStyle="closedStatus" color="closedExpired">
            <div className={styles.badgeInner}>
              <Image src={deadlineClock} alt="챌린지 마감" />
              챌린지가 마감되었어요
            </div>
          </Badge>
        ) : isClosedFull ? (
          <Badge badgeStyle="closedStatus" color="closedFull">
            <div className={styles.badgeInner}>
              <Image src={fullPerson} alt="모집완료" />
              모집이 완료된 상태에요
            </div>
          </Badge>
        ) : null}
      </div>
      <button className={styles.menu}>
        <Image src={menu} alt="메뉴" />
      </button>
      {/* 드롭다운 추가 */}
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
        <div className={styles.currentStatus}>
          <Image src={clock} alt="마감날짜" />
          {formatDate(deadline, 'ko')} 마감
        </div>
        <div className={styles.currentStatus}>
          <Image src={person} alt="참여인원" />
          {currentParticipants} / {maxParticipants} 참여중
        </div>
        {/* 도전 계속하기 / 내 작업물 보기 버튼 추가 */}
      </div>
    </div>
  );
}
