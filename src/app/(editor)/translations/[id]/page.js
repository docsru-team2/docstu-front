import EditorWrapper from '@/components/SubmissionEditor/EditorWrapper';

export default async function EditorUserTranslations({ params, searchParams }) {
  const { id } = await params;
  const { submissionId } = await searchParams;

  return <EditorWrapper challengeId={id} querySubmissionId={submissionId} />;
}
