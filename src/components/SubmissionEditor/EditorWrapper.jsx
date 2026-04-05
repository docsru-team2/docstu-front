import { getMe } from '@/lib/api/userApi';
import { getChallengeParticipants } from '@/lib/api/challengeApi';
import SubmissionEditor from './SubmissionEditor';

export default async function EditorWrapper({
  challengeId,
  querySubmissionId,
  onSubmit,
}) {
  const [me, participants] = await Promise.all([
    getMe(),
    getChallengeParticipants(challengeId).catch(() => ({ list: [] })),
  ]);
  const myParticipant = participants.list?.find((p) => p.author.id === me.id && p.author.submissionId !== '');
  const isParticipant = !!myParticipant;
  const submissionId =
    querySubmissionId || myParticipant?.author?.submissionId || '';
  return (
    <SubmissionEditor
      challengeId={challengeId}
      userType={me.userType}
      isParticipant={isParticipant}
      submissionId={submissionId}
      onSubmit={onSubmit}
    />
  );
}
