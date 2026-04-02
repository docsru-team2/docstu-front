'use client';
import Image from 'next/image.js';
import Badge from '@/components/Common/Badge/Badge.jsx';
import SimpleDropdown from '@/components/Common/SimpleDropdown/SimpleDropdown.jsx';
import { FIELD_MAP, DOCUMENT_TYPE_MAP } from '@/constants/challengeConstants';
import { formatDate } from '@/utils/dateUtils';
import DescriptionBtn from './DescriptionBtn/DescriptionBtn.jsx';
import * as styles from './DescriptionBanner.css.js';
import clock from '@public/img/challengeCard/clock.svg';
import person from '@public/img/challengeCard/person.svg';
import user from '@public/img/header/user.svg';
import deadlineClock from '@public/img/challengeCard/deadlineClock.svg';

export default function DescriptionBanner({
  challenge,
  isOwner,
  me,
  isParticipant,
}) {
  const {
    title,
    field,
    documentType,
    reviewStatus,
    description,
    maxParticipants,
    deadline,
    creator,
    _count,
    progressStatus,
    sourceUrl,
  } = challenge;

  const fieldInfo = FIELD_MAP[field];
  const menuItems = [
    { key: 'delete', label: '취소하기', action: () => console.log('취소') },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.contentGroup}>
        <div className={styles.contentLeft}>
          {progressStatus === 'CLOSED' && (
            <div className={styles.topBadge}>
              <Badge badgeStyle="closedStatus" color="closedExpired">
                <div className={styles.badgeInner}>
                  <Image src={deadlineClock} alt="챌린지 마감" />
                  챌린지가 마감되었어요
                </div>
              </Badge>
            </div>
          )}
          <div className={styles.titleBox}>
            <div className={styles.titleText}>{title}</div>
            {isOwner && reviewStatus === 'PENDING' && (
              <SimpleDropdown items={menuItems} />
            )}
          </div>
          <div className={styles.badgeWrapper}>
            <Badge badgeStyle="field" color={fieldInfo?.color}>
              {fieldInfo?.label}
            </Badge>
            <Badge badgeStyle="documentType">
              {DOCUMENT_TYPE_MAP[documentType]}
            </Badge>
          </div>
          <div className={styles.descriptionWrapper}>{description}</div>
          {isOwner ? (
            <div className={styles.infoGroup}>
              <div className={styles.infoItem}>
                <Image src={clock} alt="clock" />
                {deadline && formatDate(deadline, 'ko')} 마감
              </div>
              <div className={styles.infoItem}>
                <Image src={person} alt="person" />
                {maxParticipants} 명
              </div>
            </div>
          ) : (
            <div className={styles.nickNameGroup}>
              <Image src={user} alt="user" />
              {creator.nickname}
            </div>
          )}
        </div>
        {!isOwner && me.userType !== 'ADMIN' && (
          <DescriptionBtn
            date={formatDate(deadline, 'ko')}
            maxParticipants={maxParticipants}
            count={_count.participants}
            personIcon={person}
            clockIcon={clock}
            progressStatus={progressStatus}
            sourceUrl={sourceUrl}
            isParticipant={isParticipant}
          />
        )}
      </div>
      <div className={styles.underLine} />
      {sourceUrl && (
        <>
          <div className={styles.iframeSectionTitle}>원문 링크</div>
          <div className={styles.iframeWrapper}>
            <iframe
              src={`/api/proxy?url=${encodeURIComponent(sourceUrl)}`}
              className={styles.iframe}
            />
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iframeOpenBtn}
            >
              원문 열기 ↗
            </a>
          </div>
        </>
      )}
    </div>
  );
}
