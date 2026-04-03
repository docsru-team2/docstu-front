'use client';

import { useRouter } from 'next/navigation';
import SubmissionEditor from '@/components/SubmissionEditor/SubmissionEditor';
import { updateSubmission } from '@/lib/api/adminChallengeApi';

export default function AdminEditorWrapper({ challengeId, submissionId }) {
  const router = useRouter();

  const handleSubmit = async ({
    title,
    content,
    submissionId,
    challengeId,
  }) => {
    try {
      await updateSubmission(submissionId, { title, content });
      alert('수정되었습니다.');
      router.push('/admin/challengesList');
    } catch (error) {
      console.error('수정 실패:', error);
      alert('수정에 실패했습니다.');
    }
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
