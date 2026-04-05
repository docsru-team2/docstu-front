import AdminEditorWrapper from './AdminEditorWrapper';

export default async function EditorAdminTranslations({ params, searchParams }) {
  const { id } = await params;
  const { submissionId } = await searchParams;
  
  return <AdminEditorWrapper challengeId={id} submissionId={submissionId} />;
}
