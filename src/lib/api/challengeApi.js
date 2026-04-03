import { api } from '@/lib/fetchClient';

// 챌린지 목록 조회
// GET /challenges
export const fetchChallenges = async ({
  page = 1,
  fields = [],
  documentType,
  progressStatus,
  keyword,
} = {}) => {
  const params = new URLSearchParams({ page, limit: 10 });
  fields.forEach((f) => params.append('field', f));
  if (documentType) params.set('documentType', documentType);
  if (progressStatus) params.set('progressStatus', progressStatus);
  if (keyword) params.set('keyword', keyword);
  return api.get(`/challenges?${params}`);
};

// 챌린지 신청
// POST /challenges
export const createChallenge = async (data) => {
  return api.post('/challenges', data);
};

//get /challenges 챌린지 상세조회
export const challengeDetail = async (id) => {
  return api.get(`/challenges/${id}`);
};

// 챌린지 참가자 목록 조회
// GET /challenges/:id/participants
export const getChallengeParticipants = async (id) => {
  return api.get(`/challenges/${id}/participants`);
};

// 챌린지 참가 포기
// DELETE /challenges/:id/participants
export const withdrawChallenge = async (id) => {
  return api.delete(`/challenges/${id}/participants`);
};

// 챌린지 최다추천 작업물 조회
// GET /challenges/:id/submissions/best
export const getChallengeSubmissionsBest = async (id) => {
  return api.get(`/challenges/${id}/submissions/best`);
};

// 챌린지 작업물 목록 조회
// GET /challenges/:id/submissions
export const getChallengeSubmissions = async (
  id,
  { page = 1, limit = 5, orderBy = 'CREATED_DESC' } = {},
) => {
  const params = new URLSearchParams({ page, limit, orderBy });
  return api.get(`/challenges/${id}/submissions?${params}`);
};
