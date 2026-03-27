'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchAdminChallenges } from '@/lib/api/adminChallengeApi.js';
import ChallengeTable from '@/components/Challenge/ChallengeTable/ChallengeTable.jsx';
import SearchBar from '@/components/Common/SearchBar/SearchBar.jsx';
import SimpleDropdown from '@/components/Common/SimpleDropdown/SimpleDropdown.jsx';
import PaginationBar from '@/components/Common/PaginationBar/PaginationBar.jsx';
import { EmptyState } from '@/components/Common/EmptyState/EmptyState.jsx';

import * as styles from './page.css.js';

const PAGE_SIZE = 10;

// 드롭다운 1. 신청 상태 필터
const REVIEW_STATUS_OPTIONS = [
  { key: 'all', label: '전체', value: '' },
  { key: 'PENDING', label: '승인 대기', value: 'PENDING' },
  { key: 'APPROVED', label: '신청 승인', value: 'APPROVED' },
  { key: 'REJECTED', label: '신청 거절', value: 'REJECTED' },
];

// 드롭다운 2. 정렬
const SORT_OPTIONS = [
  { key: 'CREATED_DESC', label: '신청 시간 느린순', value: 'CREATED_DESC' },
  { key: 'CREATED_ASC', label: '신청 시간 빠른순', value: 'CREATED_ASC' },
  { key: 'DEADLINE_ASC', label: '마감 시간 빠른순', value: 'DEADLINE_ASC' },
  { key: 'DEADLINE_DESC', label: '마감 시간 느린순', value: 'DEADLINE_DESC' },
];

export default function AdminChallengesSettings() {
  const searchParams = useSearchParams();

  // URL searchParams에서 값 읽기
  // SimpleDropdown이 URL을 직접 관리
  const keyword = searchParams.get('keyword') ?? '';
  const page = Number(searchParams.get('page') ?? 1);
  const reviewStatus = searchParams.get('reviewStatus') ?? '';
  const orderBy = searchParams.get('orderBy') ?? '';

  // 전체 챌린지 조회 (신청 관리)
  const { data, isLoading } = useQuery({
    queryKey: [
      'adminChallenges',
      'MANAGE',
      keyword,
      page,
      reviewStatus,
      orderBy,
    ],
    queryFn: () =>
      fetchAdminChallenges({
        viewType: 'MANAGE',
        keyword: keyword || undefined,
        page,
        pageSize: PAGE_SIZE,
        reviewStatus: reviewStatus || undefined,
        sort: orderBy || undefined,
      }),
  });

  const challenges = data?.list ?? [];
  const totalCount = data?.totalCount ?? 0;

  return (
    <>
      <h1>챌린지 신청 관리</h1>

      {/* 드롭다운 + 검색 */}
      <div>
        {/* SimpleDropdown paramName 모드 - reviewStatus 관리 */}
        <SimpleDropdown
          items={REVIEW_STATUS_OPTIONS}
          paramName="reviewStatus"
        />
        {/* SimpleDropdown paramName 모드 - orderBy 관리 */}
        <SimpleDropdown items={SORT_OPTIONS} paramName="orderBy" />
        <SearchBar />
      </div>

      {/* 테이블 */}
      {/* ChallengeTable: dataList + getHref로 행 클릭 시 상세 이동 */}
      {isLoading ? (
        <div>로딩 중...</div>
      ) : challenges.length === 0 ? (
        <EmptyState text="신청된 챌린지가 없습니다." />
      ) : (
        <ChallengeTable
          dataList={challenges}
          getHref={(challenge) => `/admin/challengesSettings/${challenge.id}`}
        />
      )}

      {/* 페이지네이션 */}
      {totalCount > 0 && <PaginationBar totalCount={totalCount} />}
    </>
  );
}
