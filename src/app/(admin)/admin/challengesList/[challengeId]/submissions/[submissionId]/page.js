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
import { challengeDetail } from '@/lib/api/challengeApi.js';
import { formatDate } from '@/utils/dateUtils';
import { FIELD_MAP, DOCUMENT_TYPE_MAP } from '@/constants/challengeConstants';
import { Badge } from '@/components/Common/Badge';
import SimpleDropdown from '@/components/Common/SimpleDropdown/SimpleDropdown.jsx';
import { ConfirmModal } from '@/components/Common/Modal';

// todo: 공통 컴포넌트 머지 후 교체
// import Submission from '@/components/Submission/Submission.jsx';
// import { FeedbackSection } from '@/components/Feedback/FeedbackSection';

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

  // 챌린지 정보 조회 - Submission 컴포넌트에 필요
  const { data: challenge } = useQuery({
    queryKey: ['challengeDetail', submission?.challengeId],
    queryFn: () => challengeDetail(submission.challengeId),
    enabled: !!submission?.challengeId,
  });

  // 피드백 목록 조회
  const { data: feedbackData, isLoading: isFeedbackLoading } = useQuery({
    queryKey: ['submissionFeedbacks', submissionId],
    queryFn: () => fetchSubmissionFeedbacks(submissionId),
  });

  const feedbacks = feedbackData?.list ?? [];

  const [modalMode, setModalMode] = useState(MODAL_MODE.CLOSED);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  // 작업물 삭제
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

  // 피드백 삭제
  const deleteFeedbackMutation = useMutation({
    mutationFn: (feedbackId) => deleteFeedback(feedbackId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['submissionFeedbacks', submissionId],
      });
      setModalMode(MODAL_MODE.CLOSED);
      setSelectedFeedbackId(null);
    },
    onError: (error) => {
      console.error('피드백 삭제 실패:', error);
    },
  });

  // 작업물 드롭다운 메뉴
  const submissionMenuItems = [
    {
      key: 'edit',
      label: '수정하기',
      action: () =>
        router.push(
          `/admin/translations/${challengeId}?submissionId=${submissionId}`,
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

  const handleModalClose = () => {
    setModalMode(MODAL_MODE.CLOSED);
    setSelectedFeedbackId(null);
  };

  if (isSubmissionLoading || !submission) return <div>로딩 중...</div>;

  const fieldInfo = FIELD_MAP[challenge?.field];

  return (
    <div className={styles.container}>
      {/* 작업물 영역 */}

      {/* todo: Submission 컴포넌트 교체 시 아래 블록 -> <Submission submissionData={submission} isOwner={false} challengeData={challenge} /> */}
      <nav>
        <div className={styles.top}>
          <h1 className={styles.title}>{challenge?.title}</h1>
          <SimpleDropdown items={submissionMenuItems} />
        </div>
        {challenge && (
          <div className={styles.badgeGroup}>
            <Badge badgeStyle="field" color={fieldInfo?.color}>
              {fieldInfo?.label}
            </Badge>
            <Badge badgeStyle="documentType">
              {DOCUMENT_TYPE_MAP[challenge.documentType]}
            </Badge>
          </div>
        )}
      </nav>

      <div className={styles.meta}>
        <span>{submission.user?.nickname}</span>
        <span>{formatDate(submission.createdAt, 'shortDatetime')}</span>
      </div>

      <div className={styles.content}>{submission.content}</div>

      {/* 피드백 영역 */}
      {/* todo: FeedbackSection 머지 후 아래 블록 교체 */}
      {/* <FeedbackSection submissionId={submissionId} initialFeedbacks={feedbacks} initialNextCursor={null} currentUser={null} /> */}
      <div className={styles.feedbackSection}>
        <h2 className={styles.feedbackTitle}>피드백</h2>
        {isFeedbackLoading ? (
          <div>피드백 로딩 중...</div>
        ) : (
          feedbacks.map((feedback) => (
            <div key={feedback.id} className={styles.feedbackItem}>
              <div className={styles.feedbackHeader}>
                <span>{feedback.user?.nickname}</span>
                <span>{formatDate(feedback.createdAt, 'shortDatetime')}</span>
                <SimpleDropdown items={getFeedbackMenuItems(feedback.id)} />
              </div>
              <p>{feedback.content}</p>
            </div>
          ))
        )}
      </div>

      {/* 모달 */}
      {modalMode === MODAL_MODE.DELETE_SUBMISSION ? (
        <ConfirmModal
          message="작업물을 삭제하시겠습니까?"
          onConfirm={() => deleteSubmissionMutation.mutate()}
          onClose={handleModalClose}
          singleButton={false}
        />
      ) : null}

      {modalMode === MODAL_MODE.DELETE_FEEDBACK ? (
        <ConfirmModal
          message="피드백을 삭제하시겠습니까?"
          onConfirm={() => deleteFeedbackMutation.mutate(selectedFeedbackId)}
          onClose={handleModalClose}
          singleButton={false}
        />
      ) : null}
    </div>
  );
}
