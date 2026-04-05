'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAdminChallengeDetail,
  updateChallenge,
} from '@/lib/api/adminChallengeApi';
import ChallengeApplyForm from '@/components/ChallengeApplyForm/ChallengeApplyForm';

import * as styles from './page.css.js';

export default function AdminChallengeEditPage() {
  const { challengeId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  // GET /admin/challenges/:challengeId
  const { data: challenge, isLoading } = useQuery({
    queryKey: ['adminChallengeDetail', challengeId],
    queryFn: () => fetchAdminChallengeDetail(challengeId),
  });

  // 챌린지 수정 — PATCH /admin/challenges/:challengeId
  const updateMutation = useMutation({
    mutationFn: (data) => updateChallenge(challengeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminChallengeDetail', challengeId],
      });
      queryClient.invalidateQueries({ queryKey: ['adminChallenges'] });
      router.push('/admin/challengesList');
    },
    onError: (error) => {
      console.error('수정 실패:', error.status, error.message);
    },
  });

  const handleSubmit = (formData) => {
    if (updateMutation.isPending) return;
    const { title, sourceUrl, field, documentType, deadline, maxParticipants, description } = formData;
    updateMutation.mutate({
      title,
      sourceUrl,
      field,
      documentType,
      deadline,
      description,
      maxParticipants: Number(maxParticipants),
    });
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>챌린지 수정하기</h1>
      <ChallengeApplyForm
        initialData={challenge}
        btnName={updateMutation.isPending ? '수정 중...' : '수정하기'}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
