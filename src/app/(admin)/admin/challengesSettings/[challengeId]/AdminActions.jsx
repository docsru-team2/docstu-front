'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  approveChallenge,
  rejectChallenge,
} from '@/lib/api/adminChallengeApi.js';
import { Button } from '@/components/Common/Button';
import { ReasonModal } from '@/components/Common/Modal';

import * as styles from './page.css.js';

const MODAL_MODE = {
  CLOSED: null,
  REJECT: 'reject',
};

export default function AdminActions({ challengeId }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modalMode, setModalMode] = useState(MODAL_MODE.CLOSED);

  // 챌린지 승인
  const approveMutation = useMutation({
    mutationFn: () => approveChallenge(challengeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminChallengeDetail', challengeId],
      });
      queryClient.invalidateQueries({ queryKey: ['adminChallenges'] });
      router.refresh();
    },
    onError: (error) => {
      console.error('승인 실패:', error);
    },
  });

  // 챌린지 거절
  const rejectMutation = useMutation({
    mutationFn: (reason) => rejectChallenge(challengeId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminChallengeDetail', challengeId],
      });
      queryClient.invalidateQueries({ queryKey: ['adminChallenges'] });
      setModalMode(MODAL_MODE.CLOSED);
      router.refresh();
    },
    onError: (error) => {
      console.error('거절 실패:', error);
    },
  });

  const handleRejectSubmit = (reason) => {
    rejectMutation.mutate(reason);
  };

  return (
    <>
      <div className={styles.actionButtons}>
        <div className={styles.buttonWrapper}>
          <Button
            size="lg"
            color="abandon"
            onClick={() => setModalMode(MODAL_MODE.REJECT)}
          >
            거절하기
          </Button>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            size="lg"
            onClick={() => approveMutation.mutate()}
          >
            승인하기
          </Button>
        </div>
      </div>

      {/* 거절사유 모달 */}
      {modalMode === MODAL_MODE.REJECT ? (
        <ReasonModal
          title="거절 사유"
          placeholder="거절 사유를 입력해주세요"
          onSubmit={handleRejectSubmit}
          onClose={() => setModalMode(MODAL_MODE.CLOSED)}
        />
      ) : null}
    </>
  );
}