import { formatDate } from '@/utils/dateUtils';
import * as styles from './ChallengeTable.css';
import { Badge } from '@/components/Common/Badge';
import {
  DOCUMENT_TYPE_MAP,
  FIELD_MAP,
  STATUS_MAP,
} from '@/constants/challengeConstants';
import clsx from 'clsx';
import Link from 'next/link';

export default function ChallengeTable({ dataList, getHref }) {
  const columns = [
    'No.',
    '분야',
    '카테고리',
    '챌린지제목',
    '모집인원',
    '신청일',
    '마감 기한',
    '상태',
  ];

  return (
    <div className={styles.tableWrapper}>
    <div className={styles.gridTable}>
      <div className={styles.gridHeader}>
        {columns.map((col, i) => (
          <div key={i} className={styles.cellHeader}>
            {col}
          </div>
        ))}
      </div>
      {dataList.map((data, i) => {
        const fieldInfo = FIELD_MAP[data.field];
        const statusInfo = STATUS_MAP[data.reviewStatus];
        return (
          <div className={styles.gridRow} key={data.id}>
            <Link href={getHref(data)} className={styles.rowLink} />
            <div className={styles.cell}>{i + 1}</div>
            <div className={styles.cell}>{fieldInfo?.label || data.field}</div>
            <div className={styles.cell}>
              {DOCUMENT_TYPE_MAP[data.documentType] || data.documentType}
            </div>
            <div className={clsx(styles.cell, styles.title)}>{data.title}</div>
            <div className={styles.cell}>{data.maxParticipants}</div>
            <div className={styles.cell}>{formatDate(data.createdAt)}</div>
            <div className={styles.cell}>{formatDate(data.deadline)}</div>
            <div className={styles.cell}>
              <Badge badgeStyle="reviewStatus" color={statusInfo?.color}>
                {statusInfo?.label || data.reviewStatus}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}
