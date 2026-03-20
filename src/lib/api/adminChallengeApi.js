// src/lib/api/adminChallengeApi.js
import { api } from '@/lib/fetchClient';
 
const PAGE_SIZE = 10;
 
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// export const fetchAdminChallenges = async ({
//   page,
//   pageSize,
//   keyword,
//   reviewStatus,
//   sort,
// }) => {
//   const params = new URLSearchParams({ page, pageSize });

//   // 값이 있을 떄만 파라미터 추가, 빈 값이 API로 전달되는것 방지
//   if (keyword) {
//     params.set('keyword', keyword);
//   }
//   if (reviewStatus) {
//     params.set('reviewStatus', reviewStatus);
//   }
//   if (sort) {
//     params.set('sort', sort);
//   }
// }