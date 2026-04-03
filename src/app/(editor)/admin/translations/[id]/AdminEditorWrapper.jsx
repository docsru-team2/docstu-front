'use client';

import { useRouter } from 'next/navigation';
import SubmissionEditor from '@/components/SubmissionEditor/SubmissionEditor';
import { updateSubmission } from '@/lib/api/adminChallengeApi';

export default function AdminEditorWrapper({ challengeId, submissionId }) {
  const router = useRouter();

  const handleSubmit = async ({ title, content, submissionId, challengeId }) => {
    await updateSubmission(submissionId, { title, content });
    alert('수정되었습니다.');
    router.push(`/admin/challengesList`);
  };

  return (
    <SubmissionEditor
      challengeId={challengeId}
      userType="ADMIN"
      isParticipant={false}
      submissionId={submissionId}
      onSubmit={handleSubmit}
    />
  );
}