'use client'

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import mockSubmission from '@/mocks/submission-detail.json';
import { updateSubmission } from '@/lib/api/adminChallengeApi.js';
import { Button } from '@/components/Common/Button';

export default function AdminSubmissionEditPage() {
  const { challengeId, submissionId } = useParams();
  const router = useRouter();

  // todo: [로그인 토큰 연결 후] mock 제거 → 실제 API 호출로 교체
  // GET /submissions/:submissionId + useSuspenseQuery
  const submission = mockSubmission.data;

  const [title, setTitle] = useState(submission.title);
  const [content, setContent] = useState(submission.content);

  // 수정하기 — PATCH /admin/submissions/:submissionId
  const handleSubmit = async () => {
    try {
      await updateSubmission(submissionId, { title, content });
      // todo: [로그인 토큰 연결 후] useMutation + onSuccess에서 작업물 상세로 이동
      router.push(
        `/admin/challengesList/${challengeId}/submissions/${submissionId}`,
      );
    } catch (error) {
      console.error('작업물 수정 실패:', error);
    }
  };

  return (
    <>
      {/* 제목 */}
      <h1>{submission.title}</h1>

      {/* 수정하기 버튼 */}
      <div>
        <Button size="md" onClick={handleSubmit}>
          수정하기
        </Button>
      </div>

      {/* todo: 텍스트 에디터 — 한준님 작업 예정 */}
      {/* 에디터 완성 시 content state와 연결, textarea 제거 */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="번역 내용을 입력해주세요"
        rows={20}
      />
    </>
  );
}