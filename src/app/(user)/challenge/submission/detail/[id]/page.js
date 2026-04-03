import {
  submissionsDetail,
} from '@/lib/api/submissionApi';
import { getMe } from '@/lib/api/userApi';
import Submission from '@/components/Submission/Submission';
import { challengeDetail } from '@/lib/api/challengeApi';

export default async function SubmissionDetailPage({ params }) {
  const { id } = await params;
  const [submission, me] = await Promise.all([submissionsDetail(id), getMe()]);
  const submissionData = submission?.data;
  const challengeData = await challengeDetail(submission.data?.challengeId);
  const isOwner = submission.data.userId === me.id;

  return (
    <>
      <Submission
        submissionData={submissionData}
        isOwner={isOwner}
        challengeData={challengeData}
      />
    </>
  );
}
