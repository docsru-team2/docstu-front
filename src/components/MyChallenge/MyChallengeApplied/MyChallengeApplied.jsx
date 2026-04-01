'use client';

import { ChallengeTable } from '@/components/Challenge/ChallengeTable';
import { PaginationBar } from '@/components/Common/PaginationBar';
import { SearchBar } from '@/components/Common/SearchBar';
import SimpleDropdown from '@/components/Common/SimpleDropdown/SimpleDropdown';
import * as styles from './MyChallengeApplied.css';
import { EmptyState } from '@/components/Common/EmptyState';
import { useSearchParams } from 'next/navigation';

export default function MyChallengeApplied({ items, totalCount }) {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const sortItems = [
    { key: 'createedASC', label: '신청 시간 빠른순', value: 'CREATED_ASC' },
    { key: 'createdDESC', label: '신청 시간 느린순', value: 'CREATED_DESC' },
    { key: 'deadlineASC', label: '마감 기한 빠른순', value: 'DEADLINE_ASC' },
    { key: 'deadlineDESC', label: '마감 기한 느린순', value: 'DEADLINE_DESC' },
  ];
  const filterItems = [
    { key: 'all', label: '전체', value: '' },
    { key: 'pending', label: '승인 대기', value: 'PENDING' },
    { key: 'approved', label: '신청 승인', value: 'APPROVED' },
    { key: 'rejected', label: '신청 거절', value: 'REJECTED' },
    { key: 'deleted', label: '챌린지 삭제', value: 'DELETED' },
  ];
  return (
    <div>
      <div className={styles.searchBarContainer}>
        <SearchBar />
        <div className={styles.dropDownContainer}>
          <SimpleDropdown items={filterItems} paramName="reviewStatus" />
          <SimpleDropdown items={sortItems} paramName="orderBy" />
        </div>
      </div>
      {items.length === 0 ? (
        <EmptyState
          text={
            keyword
              ? `'${keyword}'로 검색된 결과가 없어요.`
              : '아직 챌린지가 없어요'
          }
        />
      ) : (
        <ChallengeTable
          dataList={items}
          getHref={(item) => `/myChallenge/applied/${item.id}`}
        />
      )}
      <div className={styles.paginationBarContainer}>
        <PaginationBar totalCount={totalCount} />
      </div>
    </div>
  );
}
