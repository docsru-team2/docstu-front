'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchSubmissionDetail,
  updateSubmission,
} from '@/lib/api/adminChallengeApi.js';
import { Button } from '@/components/Common/Button';

import * as styles from './page.css.js';

export default function AdminSubmissionEditPage() {
  const { challengeId, submissionId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  // 작업물 상세 조회 - 수정할 데이터 로드
  const { data: submission, isLoading } = useQuery({
    queryKey: ['submissionDetail', submissionId],
    queryFn: () => fetchSubmissionDetail(submissionId),
  });

  const [content, setContent] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // submission 데이터 로드 후 한 번만 초기값 설정
  if (submission && !isInitialized) {
    setContent(submission.content ?? '');
    setIsInitialized(true);
  }

  // 작업물 수정
  const updateMutation = useMutation({
    mutationFn: (data) => updateSubmission(submissionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['submissionDetail', submissionId],
      });
      router.push(
        `/admin/challengesList/${challengeId}/submissions/${submissionId}`,
      );
    },
    onError: (error) => {
      console.error('작업물 수정 실패:', error);
    },
  });

  const handleSubmit = () => {
    updateMutation.mutate({ content });
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className={styles.container}>
      {/* 제목 */}
      <h1 className={styles.title}>{submission?.title}</h1>

      {/* 수정하기 버튼 */}
      <div className={styles.buttonWrapper}>
        <Button size="md" onClick={handleSubmit}>
          수정하기
        </Button>
      </div>

      {/* todo: 에디터 완성 시 textarea 교체 -> (editor)/admin/translations/[id] 에서 처리 */}
      <textarea
        className={styles.editor}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="번역 내용을 입력해주세요"
        rows={20}
      />
    </div>
  );
}