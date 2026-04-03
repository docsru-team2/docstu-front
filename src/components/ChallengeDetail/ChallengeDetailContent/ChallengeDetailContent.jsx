import { redirect } from 'next/navigation';
import {
  challengeDetail,
  getChallengeParticipants,
  getChallengeSubmissions,
  getChallengeSubmissionsBest,
} from '@/lib/api/challengeApi';
import { getMe } from '@/lib/api/userApi';
import { formatDate } from '@/utils/dateUtils';
import ReasonBanner from '@/components/ChallengeDetail/ReasonBanner/ReasonBanner.jsx';
import {
  REASON_CONFIG,
  REVIEW_STATUS_CONFIG,
} from '@/constants/challengeConstants.js';
import ReasonContent from '@/components/ChallengeDetail/ReasonContent/ReasonContent.jsx';
import DescriptionBanner from '@/components/ChallengeDetail/DescriptionBanner/DescriptionBanner.jsx';
import { ChallengeParticipantsList } from '@/components/Challenge/ChallengeParticipantsList ';
import SubmissionsBest from '@/components/ChallengeDetail/SubmissionsBest/SubmissionsBest.jsx';

export default async function ChallengeDetailContent({ id, page = '1' }) {
  const [challengeData, me, participants, submissions, submissionBest] =
    await Promise.all([
      challengeDetail(id),
      getMe(),
      getChallengeParticipants(id).catch(() => []),
      getChallengeSubmissions(id, { page: Number(page) }).catch(() => ({
        rankList: [],
        pagination: { totalCount: 0 },
      })),
      getChallengeSubmissionsBest(id).catch(() => null),
    ]);
  console.log(submissions, 'submissions');
  const {
    reviewStatus,
    rejectReason,
    deleteReason,
    creatorId,
    updatedAt,
    progressStatus,
  } = challengeData;
  const isOwner = creatorId === me.id;
  const isClosed =
    progressStatus === 'CLOSED' ||
    new Date() > new Date(challengeData.deadline);
  const isParticipant =
    participants?.list?.some((p) => p.author.id === me.id) ?? false;
  const reviewStatusData = REVIEW_STATUS_CONFIG[reviewStatus];
  const reasonData = REASON_CONFIG[reviewStatus];
  const reason = reviewStatus === 'DELETED' ? deleteReason : rejectReason;
  const formattedDate = formatDate(updatedAt, 'shortDatetime');

  if (reviewStatus === 'PENDING' && !isOwner && me.userType !== 'ADMIN')
    redirect('/');
  console.log(participants, '참가자목록');
  console.log(me);
  return (
    <>
      {reviewStatus === 'APPROVED' && me.userType === 'ADMIN' && (
        <ReasonBanner
          color={reviewStatusData.color}
          text={reviewStatusData.text}
        />
      )}
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
        isClosed={isClosed}
      />
      {reviewStatus === 'APPROVED' && (
        <>
          {isClosed && <SubmissionsBest submissions={submissionBest ?? []} />}
          {submissions.rankList?.length > 0 && (
            <ChallengeParticipantsList
              dataList={submissions.rankList}
              totalCount={submissions.pagination?.totalCount ?? 0}
              isAdmin={me.userType === 'ADMIN'}
            />
          )}
        </>
      )}
    </>
  );
}
