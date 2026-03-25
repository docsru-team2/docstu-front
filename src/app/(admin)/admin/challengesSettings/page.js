'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import mockData from '@/mocks/admin-challenges.json';

// todo: 공통 컴포넌트 완성 시 import 주석 해제
// import Table from '@/components/Common/Table';
// import { SearchBar } from '@/components/Common/SearchBar';
// import { PaginationBar } from '@/components/Common/PaginationBar';
// import { EmptyState } from '@/components/Common/EmptyState';

// 드롭다운 1. 신청 상태 필터
const REVIEW_STATUS_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'PENDING', label: '승인 대기' },
  { value: 'APPROVED', label: '신청 승인' },
  { value: 'REJECTED', label: '신청 거절' },
];

// 드롭다운 2. 정렬
const SORT_OPTIONS = [
  { value: 'CREATED_DESC', label: '신청 시간 느린순' },
  { value: 'CREATED_ASC', label: '신청 시간 빠른순' },
  { value: 'DEADLINE_ASC', label: '마감 시간 빠른순' },
  { value: 'DEADLINE_DESC', label: '마감 시간 느린순' },
];

export default function AdminChallengesSettings() {
  const router = useRouter();

  // 필터/정렬/검색/페이지 상태 — BE API 쿼리 파라미터로 전달
  const [reviewStatus, setReviewStatus] = useState('');
  const [sort, setSort] = useState('CREATED_DESC');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);

  // todo: BE API 완성 후 mock 제거
  // fetchAdminChallenges({ viewType: 'MANAGE', reviewStatus, sort, keyword, page }) + useSuspenseQuery
  // 서버에서 필터링/정렬/검색/페이지네이션 처리 → 클라이언트는 결과만 렌더링
  const challenges = mockData.data.list;

  // 드롭다운 변경 시 1페이지로 이동
  const handleReviewStatusChange = (value) => {
    setReviewStatus(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  // 행 클릭 → 상세 페이지로 이동
  const handleRowClick = (challengeId) => {
    router.push(`/admin/challengesSettings/${challengeId}`);
  };

  return (
    <>
      <h1>챌린지 신청 관리</h1>

      {/* 검색 + 드롭다운 영역 */}
      {/* todo: SearchBar, 공통 드롭다운 컴포넌트로 교체 */}
      <div>
        <select
          value={reviewStatus}
          onChange={(e) => handleReviewStatusChange(e.target.value)}
        >
          {REVIEW_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(e) => handleSortChange(e.target.value)}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 테이블 */}
      {/* todo: Table 공통 컴포넌트로 교체 */}
      {/* 피그마 컬럼: No, 분야, 닉네임, 챌린지 제목, 마감시간, 신청시간, 신청상태(뱃지) */}
      <div>
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            onClick={() => handleRowClick(challenge.id)}
          >
            <span>{challenge.id}</span>
            <span>{challenge.title}</span>
            <span>{challenge.applicant?.nickname}</span>
            <span>{challenge.reviewStatus}</span>
          </div>
        ))}
      </div>

      {/* todo: PaginationBar 공통 컴포넌트로 교체 */}
      {/* todo: 목록 비어있을 때 EmptyState 공통 컴포넌트로 교체 */}
    </>
  );
}
