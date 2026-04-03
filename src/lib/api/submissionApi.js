// src/lib/api/submissionApi.js
import { api } from '@/lib/fetchClient';

// 챌린지의 작업물 전체 목록 조회
// GET /challenges/:challengeId/submissions
export const fetchSubmissions = async (challengeId) => {
  return api.get(`/challenges/${challengeId}/submissions`);
};

//get /submissions/:id 작업물 상세조회
export const submissionsDetail = async (id) => {
  return api.get(`/submissions/${id}`);
};

//get /submissions/:id/likes 작업물 좋아요 여부 확인
export const likeCheck = async (id) => {
  return api.get(`/submissions/${id}/likes`);
}

//post /submissions/:id/likes 작업물 추천 +1
export const submissionsLike = async (id) => {
  return api.post(`/submissions/${id}/likes`);
};

//delete /submissions/:id/likes 작업물 추천 취소
export const submissionsLikeDelete = async (id) => {
  return api.delete(`/submissions/${id}/likes`);
};

