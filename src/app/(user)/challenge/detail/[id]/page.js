import { redirect } from 'next/navigation';
import {
  challengeDetail,
  getChallengeParticipants,
} from '@/lib/api/challengeApi';
import { getMe } from '@/lib/api/userApi';
import { formatDate } from '@/utils/dateUtils';
import * as styles from './detail.css.js';
import ReasonBanner from '@/components/ChallengeDetail/ReasonBanner/ReasonBanner.jsx';
import {
  REASON_CONFIG,
  REVIEW_STATUS_CONFIG,
} from '@/constants/challengeConstants.js';
import ReasonContent from '@/components/ChallengeDetail/ReasonContent/ReasonContent.jsx';
import DescriptionBanner from '@/components/ChallengeDetail/DescriptionBanner/DescriptionBanner.jsx';

export default async function ChallengeDetailPage({ params }) {
  const { id } = await params;
  const [challengeData, me, participants] = await Promise.all([
    challengeDetail(id),
    getMe(),
    getChallengeParticipants(id).catch(() => []),
  ]);

const { reviewStatus, rejectReason, deleteReason, creatorId, updatedAt } =
    challengeData;
  const isOwner = creatorId === me.id;
  const isParticipant =
    participants?.list?.some((p) => p.author.id === me.id) ?? false;
  const reviewStatusData = REVIEW_STATUS_CONFIG[reviewStatus];
  const reasonData = REASON_CONFIG[reviewStatus];
  const reason = reviewStatus === 'DELETED' ? deleteReason : rejectReason;
  const formattedDate = formatDate(updatedAt, 'shortDatetime');

  if (reviewStatus === 'PENDING' && !isOwner) redirect('/');

  return (
    <div className={styles.container}>
      {reviewStatus !== 'APPROVED' && (
        <>
          <ReasonBanner
            color={reviewStatusData.color}
            text={reviewStatusData.text}
          />
          {reviewStatus !== 'PENDING' && (
            <ReasonContent
              title={reasonData}
              content={reason}
              date={formattedDate}
            />
          )}
        </>
      )}

      <DescriptionBanner
        challenge={challengeData}
        isOwner={isOwner}
        me={me}
        isParticipant={isParticipant}
      />
    </div>
  );
}
