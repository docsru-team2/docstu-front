'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAdminChallengeDetail,
  approveChallenge,
  rejectChallenge,
} from '@/lib/api/adminChallengeApi.js';
import { formatDate } from '@/utils/dateUtils';
import { Button } from '@/components/Common/Button';
import { ReasonModal } from '@/components/Common/Modal';

import * as styles from './page.css.js';

const MODAL_MODE = {
  CLOSED: null,
  REJECT: 'reject',
};

export default function AdminChallengeDetailPage() {
  const { challengeId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  // GET /admin/challenges/:challengeId
  const { data: challenge, isLoading } = useQuery({
    queryKey: ['adminChallengeDetail', challengeId],
    queryFn: () => fetchAdminChallengeDetail(challengeId),
  });

  const [modalMode, setModalMode] = useState(MODAL_MODE.CLOSED);

  // 챌린지 승인
  const approveMutation = useMutation({
    mutationFn: () => approveChallenge(challengeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminChallengeDetail', challengeId],
      });
      queryClient.invalidateQueries({ queryKey: ['adminChallenges'] });
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
    },
    onError: (error) => {
      console.error('거절 실패:', error);
    },
  });

  // < > 내비게이션
  const handlePrev = () => {
    if (!challenge?.navigation?.prevId) return;
    router.push(`/admin/challengesSettings/${challenge.navigation.prevId}`);
  };

  const handleNext = () => {
    if (!challenge?.navigation?.nextId) return;
    router.push(`/admin/challengesSettings/${challenge.navigation.nextId}`);
  };

  // 거절 사유 전달
  const handleRejectSubmit = (reason) => {
    rejectMutation.mutate(reason);
  };

  if (isLoading || !challenge) return <div>로딩 중...</div>;

  return (
    <>
      {/* 승인 후 배너 */}
      {challenge.reviewStatus === 'APPROVED' && (
        <div>신청이 승인된 챌린지입니다.</div>
      )}

      {/* 거절 후 배너 + 거절 사유 박스 */}
      {challenge.reviewStatus === 'REJECTED' && (
        <>
          <div>신청이 거절된 챌린지입니다.</div>
          <div>
            <h3>신청 거절 사유</h3>
            <p>{challenge.rejectReason ?? '거절 사유 없음'}</p>
          </div>
        </>
      )}

      {/* No. + 내비게이션 */}
      <div>
        <span>No. {challenge.id}</span>
        <button onClick={handlePrev} disabled={!challenge.navigation?.prevId}>
          &lt;
        </button>
        <button onClick={handleNext} disabled={!challenge.navigation?.nextId}>
          &gt;
        </button>
      </div>

      {/* todo: 챌린지 정보 공통 컴포넌트로 교체 */}
      {/* 제목, 뱃지, 설명, 작성자, 마감일, 참여인원, 원문 링크 */}

      {/* PENDING일 때만 거절하기 + 승인하기 버튼 */}
      {challenge.reviewStatus === 'PENDING' && (
        <div>
          <Button
            size="lg"
            color="abandon"
            onClick={() => setModalMode(MODAL_MODE.REJECT)}
          >
            거절하기
          </Button>
          <Button size="lg" onClick={() => approveMutation.mutate()}>
            승인하기
          </Button>
        </div>
      )}

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
