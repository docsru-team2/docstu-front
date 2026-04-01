'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchSubmissionDetail,
  fetchSubmissionFeedbacks,
  deleteSubmission,
  deleteFeedback,
} from '@/lib/api/adminChallengeApi.js';
import { formatDate } from '@/utils/dateUtils';
import SimpleDropdown from '@/components/Common/SimpleDropdown/SimpleDropdown.jsx';
import { ConfirmModal } from '@/components/Common/Modal';

import * as styles from './page.css.js';

const MODAL_MODE = {
  CLOSED: null,
  DELETE_SUBMISSION: 'deleteSubmission',
  DELETE_FEEDBACK: 'deleteFeedback',
};

export default function AdminSubmissionDetailPage() {
  const { challengeId, submissionId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  // 작업물 상세 조회
  const { data: submission, isLoading: isSubmissionLoading } = useQuery({
    queryKey: ['submissionDetail', submissionId],
    queryFn: () => fetchSubmissionDetail(submissionId),
  });

  // 피드백 목록 조회
  const { data: feedbackData, isLoading: isFeedbackLoading } = useQuery({
    queryKey: ['submissionFeedbacks', submissionId],
    queryFn: () => fetchSubmissionFeedbacks(submissionId),
  });

  const feedbacks = feedbackData?.list ?? [];

  const [modalMode, setModalMode] = useState(MODAL_MODE.CLOSED);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  // 작업물 삭제 - PATCH /admin/submissions/:id/delete
  // 사유 없이 삭제 — BE에서 작성자에게 "관리자에 의해 삭제" 알림 발송
  const deleteSubmissionMutation = useMutation({
    mutationFn: () => deleteSubmission(submissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissionDetail'] });
      router.push(`/admin/challengesList/${challengeId}`);
    },
    onError: (error) => {
      console.error('작업물 삭제 실패:', error);
    },
  });

  // 피드백 삭제 - DELETE /admin/feedbacks/:feedbackId
  // 사유 없이 삭제 — BE에서 작성자에게 "관리자에 의해 삭제" 알림 발송
  const deleteFeedbackMutation = useMutation({
    mutationFn: (feedbackId) => deleteFeedback(feedbackId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissionFeedbacks', submissionId] });
      setModalMode(MODAL_MODE.CLOSED);
      setSelectedFeedbackId(null);
    },
    onError: (error) => {
      console.error('피드백 삭제 실패:', error);
    },
  });

  // 작업물 드롭다운 메뉴 - 수정하기 / 삭제하기
  const submissionMenuItems = [
    {
      key: 'edit',
      label: '수정하기',
      action: () =>
        router.push(
          `/admin/challengesList/${challengeId}/submissions/${submissionId}/edit`,
        ),
    },
    {
      key: 'delete',
      label: '삭제하기',
      action: () => setModalMode(MODAL_MODE.DELETE_SUBMISSION),
    },
  ];

  // 피드백 드롭다운 메뉴 - 삭제하기만
  const getFeedbackMenuItems = (feedbackId) => [
    {
      key: 'delete',
      label: '삭제하기',
      action: () => {
        setSelectedFeedbackId(feedbackId);
        setModalMode(MODAL_MODE.DELETE_FEEDBACK);
      },
    },
  ];

  // 모달 닫기 + 상태 초기화
  const handleModalClose = () => {
    setModalMode(MODAL_MODE.CLOSED);
    setSelectedFeedbackId(null);
  };

  if (isSubmissionLoading || !submission) return <div>로딩 중...</div>;

  return (
    <>
      {/* 작업물 헤더 - 제목 + 드롭다운 메뉴 */}
      {/* todo: 작업물 정보 공통 컴포넌트로 교체 */}
      <div>
        <h1>{submission.title}</h1>
        <SimpleDropdown items={submissionMenuItems} />
      </div>

      {/* 작성자 + 날짜 */}
      <div>
        <span>{submission.user?.nickname}</span>
        <span>{formatDate(submission.createdAt)}</span>
      </div>

      {/* 작업물 본문 */}
      {/* todo: 마크다운 교체 */}
      <div>{submission.content}</div>

      {/* 피드백 목록 */}
      {isFeedbackLoading ? (
        <div>피드백 로딩 중...</div>
      ) : (
        feedbacks.map((feedback) => (
          <div key={feedback.id}>
            {/* todo: 피드백 아이템 공통 컴포넌트로 교체 */}
            <div>
              <span>{feedback.user?.nickname}</span>
              <span>{formatDate(feedback.createdAt)}</span>
              <SimpleDropdown items={getFeedbackMenuItems(feedback.id)} />
            </div>
            <p>{feedback.content}</p>
          </div>
        ))
      )}

      {/* todo: "더 보기" - hasNext 기반 피드백 추가 로드 */}

      {/* 작업물 삭제 확인 모달 - 사유 없음, BE에서 알림 발송 */}
      {modalMode === MODAL_MODE.DELETE_SUBMISSION ? (
        <ConfirmModal
          message="작업물을 삭제하시겠습니까?"
          onConfirm={() => deleteSubmissionMutation.mutate()}
          onClose={handleModalClose}
          singleButton={false}
        />
      ) : null}

      {/* 피드백 삭제 확인 모달 - 사유 없음, BE에서 알림 발송 */}
      {modalMode === MODAL_MODE.DELETE_FEEDBACK ? (
        <ConfirmModal
          message="피드백을 삭제하시겠습니까?"
          onConfirm={() => deleteFeedbackMutation.mutate(selectedFeedbackId)}
          onClose={handleModalClose}
          singleButton={false}
        />
      ) : null}
    </>
  );
}