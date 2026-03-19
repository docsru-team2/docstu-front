// src/lib/api/adminChallengeApi.js
// todo: 한준님 자동 토큰 작업 후 다시 작업 필요

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