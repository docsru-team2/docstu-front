import { api } from '@/lib/fetchClient';

const PAGE_SIZE = 10;

//내가 진행중인 목록조회
//GET/ challenges/me/ongoing

export const fetchMyChallengesOngoing = async ({
  page = 1,
  limit = PAGE_SIZE,
  keyword,
}) => {
  const params = new URLSearchParams({ page, limit });

  if (keyword) {
    params.set('keyword', keyword);
  }

  params.set('progressStatus', 'OPEN');

  return api.get(`/challenges/joined?${params}`);
};

//내가 완료한 목록조회
//GET/ challenges/me/completed
export const fetchMyChallengesCompleted = async ({
  page = 1,
  limit = PAGE_SIZE,
  keyword,
}) => {
  const params = new URLSearchParams({ page, limit });

  if (keyword) {
    params.set('keyword', keyword);
  }

  params.set('progressStatus', 'CLOSED');

  return api.get(`/challenges/joined?${params}`);
};

//내가 신청한 목록조회
//GET/ challenges/me/applied
export const fetchMyChallengesApplied = async ({
  page = 1,
  limit = PAGE_SIZE,
  reviewStatus,
  keyword,
  orderBy,
}) => {
  const params = new URLSearchParams({ page, limit });

  if (keyword) params.set('keyword', keyword);
  if (reviewStatus) params.set('reviewStatus', reviewStatus);
  if (orderBy) params.set('orderBy', orderBy);

  return api.get(`/challenges/me/applied?${params}`, { cache: 'no-store' });
};
