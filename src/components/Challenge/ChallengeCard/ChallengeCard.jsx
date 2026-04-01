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
import Link from 'next/link';
import { Button } from '@/components/Common/Button';
import arrow from '@public/img/arrow/btnArrowRight.svg';
import documentIcon from '@public/img/btn/document.svg';

export default function ChallengeCard({ data, onEdit, onDelete }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');
  const isOngoing = pathname.includes('/myChallenge/ongoing');
  const isCompleted = pathname.includes('/myChallenge/completed');

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
    { key: 'edit', label: '수정하기', action: () => onEdit?.(id) },
    { key: 'delete', label: '삭제하기', action: () => onDelete?.(data) },
  ];

  return (
    <Link className={cardContainer} href={`/challenge/detail/${id}`}>
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
        <div
          className={styles.menu}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
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
        {isOngoing && (
          <div className={styles.btnWrapper}>
            <Button
              roundBtn
              size="sm"
              color="secondary"
              hasIcon={arrow}
              fontSize
            >
              도전 계속하기
            </Button>
          </div>
        )}

        {isCompleted && (
          <div className={styles.btnWrapper}>
            <Button
              roundBtn
              size="sm"
              color="opacity"
              hasIcon={documentIcon}
              fontSize
            >
              내 작업물 보기
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
}
