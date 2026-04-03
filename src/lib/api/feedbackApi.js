import { api } from '@/lib/fetchClient';

const PAGE_SIZE = 3;

// 피드백 목록조회
export const fetchSubmissionFeedbackList = async ({
  submissionId,
  page = 1,
  limit = PAGE_SIZE,
}) => {
  const params = new URLSearchParams({ page, limit });
  return api.get(`/submissions/${submissionId}/feedbacks?${params}`);
};

//피드백 생성
export const createSubmissionFeedback = async ({ submissionId, content }) => {
  return api.post(`/submissions/${submissionId}/feedbacks`, { content });
};

//피드백 수정
export const updateFeedback = async (id, data) => {
  return api.patch(`/feedbacks/${id}`, data);
};

//피드백 삭제
export const removeFeedback = async (id) => {
  return api.delete(`/feedbacks/${id}`);
};
