import { submissionsDetail } from '@/lib/api/submissionApi';
import { getMe } from '@/lib/api/userApi';
import Submission from '@/components/Submission/Submission';
import { challengeDetail } from '@/lib/api/challengeApi';
import { FeedbackSection } from '@/components/Feedback/FeedbackSection';
import { fetchSubmissionFeedbackList } from '@/lib/api/feedbackApi';

export default async function SubmissionDetailPage({ params }) {
  const { id } = await params;
  const [submission, me] = await Promise.all([submissionsDetail(id), getMe()]);
  const submissionData = submission?.data;
  const challengeData = await challengeDetail(submission.data?.challengeId);
  const isOwner = submission.data.userId === me.id;

  const feedbackData = await fetchSubmissionFeedbackList({
    submissionId: submissionData.id,
    limit: 3,
    page: 1,
  });

  const initialFeedbacks = feedbackData?.list ?? [];
  const initialNextCursor = feedbackData?.pagination?.hasNext ? 2 : null;
  return (
    <>
      <Submission
        submissionData={submissionData}
        isOwner={isOwner}
        challengeData={challengeData}
      />
      <FeedbackSection
        submissionId={submissionData.id}
        initialFeedbacks={initialFeedbacks}
        initialNextCursor={initialNextCursor}
        currentUser={me}
      />
    </>
  );
}
