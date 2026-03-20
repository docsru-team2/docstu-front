import { formatDate } from '@/utils/dateUtils';
import { Badge } from '../../Common/Badge';
import { FIELD_MAP, DOCUMENT_TYPE_MAP } from '@/constants/challengeConstants';
import Image from 'next/image';
import { IMAGE_SIZES } from '@/constants/uiDimensions';
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
              <Image
                src="/img/challengeCard/deadlineClock.svg"
                alt="챌린지 마감"
                width={IMAGE_SIZES.FUll_PERSON}
                height={IMAGE_SIZES.FUll_PERSON}
              />
              챌린지가 마감되었어요
            </div>
          </Badge>
        ) : isClosedFull ? (
          <Badge badgeStyle="closedStatus" color="closedFull">
            <div className={styles.badgeInner}>
              <Image
                src="/img/challengeCard/fullPerson.svg"
                alt="모집완료"
                width={IMAGE_SIZES.FUll_PERSON}
                height={IMAGE_SIZES.FUll_PERSON}
              />
              모집이 완료된 상태에요
            </div>
          </Badge>
        ) : null}
      </div>
      <button className={styles.menu}>
        <Image
          src="/img/btn/menu.svg"
          alt="메뉴"
          width={IMAGE_SIZES.MENU}
          height={IMAGE_SIZES.MENU}
        />
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
          <Image
            src="/img/challengeCard/clock.svg"
            alt="모집완료"
            width={IMAGE_SIZES.CLOCK}
            height={IMAGE_SIZES.CLOCK}
          />
          {formatDate(deadline, 'ko')} 마감
        </div>
        <div className={styles.currentStatus}>
          <Image
            src="/img/challengeCard/person.svg"
            alt="모집완료"
            width={IMAGE_SIZES.PERSON}
            height={IMAGE_SIZES.PERSON}
          />
          {currentParticipants} / {maxParticipants} 참여중
        </div>
        {/* 도전 계속하기 / 내 작업물 보기 버튼 추가 */}
      </div>
    </div>
  );
}
