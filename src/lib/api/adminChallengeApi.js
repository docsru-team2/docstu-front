// src/lib/api/adminChallengeApi.js
import { api } from '@/lib/fetchClient';

const PAGE_SIZE = 5;

// 어드민 챌린지 목록 조회
// GET /admin/challenges
export const fetchAdminChallenges = async ({
  page = 1,
  pageSize = PAGE_SIZE,
  viewType = 'MANAGE', //전체 조회
  keyword,
  reviewStatus,
  field,
  sort,
}) => {
  const params = new URLSearchParams({ page, pageSize });

  // 값이 있을 때만 파라미터 추가, 빈 값이 API로 전달되는것 방지
  if (keyword) {
    params.set('keyword', keyword);
  }
  if (reviewStatus) {
    params.set('reviewStatus', reviewStatus);
  }
  if (field) {
    params.set('field', field);
  }
  if (sort) {
    params.set('sort', sort);
  }

  return api.get(`/admin/challenges?${params}`);
};

// 챌린지 상세 조회
// GET /admin/challenges/:challengeId
export const fetchAdminChallengeDetail = async (challengeId) => {
  return api.get(`/admin/challenges/${challengeId}`);
};

// 챌린지 승인
// PATCH /admin/challenges/:challengeId/approve
export const approveChallenge = async (challengeId) => {
  return api.patch(`/admin/challenges/${challengeId}/approve`);
};

// 챌린지 거절
// PATCH /admin/challenges/:challengeId/reject
// rejectReason 필수, 없으면 BE에서 400 반환
export const rejectChallenge = async (challengeId, rejectReason) => {
  return api.patch(`/admin/challenges/${challengeId}/reject`, { rejectReason });
};

// 챌린지 수정
// PATCH /admin/challenges/:challengeId
export const updateChallenge = async (challengeId, data) => {
  return api.patch(`/admin/challenges/${challengeId}`, data);
};

// 챌린지 삭제
// DELETE /admin/challenges/:challengeId
// 삭제 시 신청자 + 참여자 전체에게 사유 포함 알림 발송 (BE 처리)
export const deleteChallenge = async (challengeId, deleteReason) => {
  return api.delete(`/admin/challenges/${challengeId}`, { deleteReason });
};

// 어드민 작업물 수정
// PATCH /admin/submissions/:submissionId
export const updateSubmission = async (submissionId, data) => {
  return api.patch(`/admin/submissions/${submissionId}`, data);
};

// 어드민 작업물 삭제
// DELETE /admin/submissions/:submissionId
export const deleteSubmission = async (submissionId) => {
  return api.delete(`/admin/submissions/${submissionId}`);
};
