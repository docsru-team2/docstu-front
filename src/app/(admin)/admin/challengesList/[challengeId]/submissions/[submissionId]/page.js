'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import mockSubmission from '@/mocks/submission-detail.json';
import mockFeedback from '@/mocks/feedback.json';
import {
  deleteSubmission,
  deleteFeedback,
} from '@/lib/api/adminChallengeApi.js';
import { ConfirmModal } from '@/components/Common/Modal';

const MODAL_MODE = {
  CLOSED: null,
  DELETE_SUBMISSION: 'deleteSubmission',
  DELETE_FEEDBACK: 'deleteFeedback',
};

export default function AdminSubmissionDetailPage() {
  const { challengeId, submissionId } = useParams();
  const router = useRouter();

  // todo: [로그인 토큰 연결 후] mock 제거 → 실제 API 호출로 교체
  // GET /submissions/:submissionId + useSuspenseQuery
  // GET /submissions/:submissionId/feedbacks + useSuspenseQuery
  const submission = mockSubmission.data;
  const feedbacks = mockFeedback.data.list;

  const [modalMode, setModalMode] = useState(MODAL_MODE.CLOSED);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [openFeedbackMenuId, setOpenFeedbackMenuId] = useState(null);

  // 작업물 삭제 
  // 사유 없이 삭제 — BE에서 작성자에게 "관리자에 의해 삭제" 알림 발송
  const handleDeleteSubmission = async () => {
    try {
      await deleteSubmission(submissionId);
      // todo: [로그인 토큰 연결 후] useMutation + onSuccess에서 챌린지 상세로 이동
      router.push(`/admin/challengesList/${challengeId}`);
    } catch (error) {
      console.error('작업물 삭제 실패:', error);
    }
    setModalMode(MODAL_MODE.CLOSED);
  };

  // 피드백 - 메뉴 토글
  const handleFeedbackMenuToggle = (feedbackId) => {
    setOpenFeedbackMenuId((prev) =>
      prev === feedbackId ? null : feedbackId,
    );
  };

  // 피드백 삭제 - 모달 열기 
  const handleDeleteFeedbackClick = (feedbackId) => {
    setSelectedFeedbackId(feedbackId);
    setOpenFeedbackMenuId(null);
    setModalMode(MODAL_MODE.DELETE_FEEDBACK);
  };

  // 피드백 삭제 확인
  // 사유 없이 삭제 — BE에서 작성자에게 "관리자에 의해 삭제" 알림 발송
  const handleDeleteFeedback = async () => {
    try {
      await deleteFeedback(selectedFeedbackId);
      // todo: [로그인 토큰 연결 후] useMutation + invalidateQueries
    } catch (error) {
      console.error('피드백 삭제 실패:', error);
    }
    setModalMode(MODAL_MODE.CLOSED);
    setSelectedFeedbackId(null);
  };

  const handleModalClose = () => {
    setModalMode(MODAL_MODE.CLOSED);
    setSelectedFeedbackId(null);
  };

  return (
    <>
      {/* todo: 작업물 정보 공통 컴포넌트로 교체 */}

      {/* 작업물 ⋮ 메뉴 - 어드민 전용 */}
      {/* todo: 드롭다운 공통 컴포넌트로 교체 */}
      <button
        onClick={() =>
          router.push(
            `/admin/challengesList/${challengeId}/submissions/${submissionId}/edit`,
          )
        }
      >
        수정하기
      </button>
      <button onClick={() => setModalMode(MODAL_MODE.DELETE_SUBMISSION)}>
        삭제하기
      </button>

      {/* todo: 피드백 입력 공통 컴포넌트로 교체 */}

      {/* 피드백 목록 */}
      {feedbacks.map((feedback) => (
        <div key={feedback.id}>
          {/* todo: 피드백 아이템 공통 컴포넌트로 교체 */}
          <span>{feedback.author?.nickname}</span>
          <span>{feedback.content}</span>

          <button onClick={() => handleFeedbackMenuToggle(feedback.id)}>
            ⋮
          </button>
          {openFeedbackMenuId === feedback.id && (
            <div>
              <button onClick={() => handleDeleteFeedbackClick(feedback.id)}>
                삭제하기
              </button>
            </div>
          )}
        </div>
      ))}

      {/* todo: "더 보기" — hasNext 기반 피드백 추가 로드 */}

      {/* 작업물 삭제 확인 모달 — 사유 없음, BE에서 알림 발송 */}
      {modalMode === MODAL_MODE.DELETE_SUBMISSION ? (
        <ConfirmModal
          message="작업물을 삭제하시겠습니까?"
          onConfirm={handleDeleteSubmission}
          onClose={handleModalClose}
          singleButton={false}
        />
      ) : null}

      {/* 피드백 삭제 확인 모달 — 사유 없음, BE에서 알림 발송 */}
      {modalMode === MODAL_MODE.DELETE_FEEDBACK ? (
        <ConfirmModal
          message="피드백을 삭제하시겠습니까?"
          onConfirm={handleDeleteFeedback}
          onClose={handleModalClose}
          singleButton={false}
        />
      ) : null}
    </>
  );
}