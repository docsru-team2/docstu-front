'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import mockData from '@/mocks/admin-challenge-detail.json';
import {
  approveChallenge,
  rejectChallenge,
} from '@/lib/api/adminChallengeApi.js';
import { formatDate } from '@/utils/dateUtils';
import { Button } from '@/components/Common/Button';
import { ReasonModal } from '@/components/Common/Modal';

// todo: 챌린지 정보 공통 컴포넌트 완성 시 import

const MODAL_MODE = {
  CLOSED: null,
  REJECT: 'reject',
};

export default function AdminChallengeDetailPage() {
  const { challengeId } = useParams();
  const router = useRouter();

  // todo: BE API 완성 후 mock 제거
  // fetchAdminChallengeDetail(challengeId) + useSuspenseQuery
  const challenge = mockData.data;

  const [modalMode, setModalMode] = useState(MODAL_MODE.CLOSED);

  const handlePrev = () => {
    if (!challenge?.navigation?.prevId) return;
    router.push(`/admin/challengesSettings/${challenge.navigation.prevId}`);
  };

  const handleNext = () => {
    if (!challenge?.navigation?.nextId) return;
    router.push(`/admin/challengesSettings/${challenge.navigation.nextId}`);
  };

  const handleApprove = async () => {
    try {
      await approveChallenge(challengeId);
      // todo: useMutation + onSuccess에서 invalidateQueries
    } catch (error) {
      console.error('승인 실패:', error);
    }
  };

  const handleRejectSubmit = async (reason) => {
    try {
      await rejectChallenge(challengeId, reason);
      // todo: useMutation + onSuccess에서 invalidateQueries
    } catch (error) {
      console.error('거절 실패:', error);
    }
    setModalMode(MODAL_MODE.CLOSED);
  };

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
          {/* todo: BE 응답에 rejectReason, rejectedBy, rejectedAt 포함 확인 */}
          <div>
            <h3>신청 거절 사유</h3>
            <p>{challenge.rejectReason ?? '거절 사유 없음'}</p>
            <span>{challenge.rejectedBy ?? ''}</span>
            <span>{challenge.rejectedAt ? formatDate(challenge.rejectedAt, 'dot') : ''}</span>
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
      {/* 제목, 뱃지, 설명, 작성자, 마감일, 참여인원, 원문 링크 iframe */}

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
          <Button
            size="lg"
            onClick={handleApprove}
          >
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