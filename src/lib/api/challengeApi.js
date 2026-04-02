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

