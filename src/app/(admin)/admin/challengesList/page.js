'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAdminChallenges,
  deleteChallenge,
} from '@/lib/api/adminChallengeApi.js';
import ChallengeCard from '@/components/Challenge/ChallengeCard/ChallengeCard.jsx';
import SearchBar from '@/components/Common/SearchBar/SearchBar.jsx';
import FilterDropdown from '@/components/Common/FilterDropdown/FilterDropdown.jsx';
import PaginationBar from '@/components/Common/PaginationBar/PaginationBar.jsx';
import { EmptyState } from '@/components/Common/EmptyState/EmptyState.jsx';
import { ReasonModal } from '@/components/Common/Modal';

import * as styles from './page.css.js';

const PAGE_SIZE = 10;

const MODAL_MODE = {
  CLOSED: null,
  DELETE: 'delete',
};

export default function AdminChallengesList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // URL searchParams에서 필터/검색/페이지 값 읽기
  // SearchBar, FilterDropdown, PaginationBar가 URL을 직접 관리
  const keyword = searchParams.get('keyword') ?? '';
  const page = Number(searchParams.get('page') ?? 1);
  const field = searchParams.getAll('field');
  const documentType = searchParams.get('documentType') ?? '';
  const progressStatus = searchParams.get('progressStatus') ?? '';

  // viewType: 'LIST' - 승인된 챌린지만 조회
  const { data, isLoading } = useQuery({
    queryKey: [
      'adminChallenges',
      'LIST',
      keyword,
      page,
      field,
      documentType,
      progressStatus,
    ],
    queryFn: () =>
      fetchAdminChallenges({
        viewType: 'LIST',
        keyword: keyword || undefined,
        page,
        pageSize: PAGE_SIZE,
        field: field.length > 0 ? field.join(',') : undefined,
      }),
  });

  // BE 응답: { list, totalCount, hasNext }
  const challenges = data?.list ?? [];
  const totalCount = data?.totalCount ?? 0;

  // 삭제 모달 상태
  const [modalMode, setModalMode] = useState(MODAL_MODE.CLOSED);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  // 챌린지 삭제
  const deleteMutation = useMutation({
    mutationFn: ({ id, reason }) => deleteChallenge(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminChallenges'] });
      setModalMode(MODAL_MODE.CLOSED);
      setSelectedChallenge(null);
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
    },
  });

  // 메뉴 - 수정하기 클릭
  const handleEditClick = (challengeId) => {
    router.push(`/admin/challengesList/${challengeId}/edit`);
  };

  // 메뉴 - 삭제하기 클릭 -> 모달 열기
  const handleDeleteClick = (challenge) => {
    setSelectedChallenge(challenge);
    setModalMode(MODAL_MODE.DELETE);
  };

  // ReasonModal onSubmit - 사유와 함께 삭제
  const handleDeleteSubmit = (reason) => {
    deleteMutation.mutate({ id: selectedChallenge?.id, reason });
  };

  // 모달 닫기 + 상태 초기화
  const handleModalClose = () => {
    setModalMode(MODAL_MODE.CLOSED);
    setSelectedChallenge(null);
  };

  return (
    <>
      <h1 className={styles.heading}>챌린지 목록</h1>

      {/* 필터 + 검색 */}
      <div className={styles.filterBar}>
        <FilterDropdown />
        <SearchBar />
      </div>

      {/* 카드 리스트 */}
      {/* ChallengeCard: admin 경로에서 메뉴(수정/삭제) 자동 표시 */}
      {/* onEdit/onDelete로 메뉴 동작 제어 */}
      {isLoading ? (
        <div>로딩 중...</div>
      ) : challenges.length === 0 ? (
        <EmptyState text="챌린지가 없습니다." />
      ) : (
        <div className={styles.cardList}>
          {challenges.map((challenge) => (
            <div key={challenge.id} className={styles.cardWrapper}>
              <ChallengeCard
                data={challenge}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            </div>
          ))}
        </div>
      )}

      {/* 페이지네이션 - totalCount 넘기면 내부에서 총 페이지 수 계산 */}
      {totalCount > 0 && <PaginationBar totalCount={totalCount} />}

      {/* 챌린지 삭제 사유 모달 - 스키마에 deleteReason 있음 */}
      {modalMode === MODAL_MODE.DELETE ? (
        <ReasonModal
          title="삭제 사유"
          placeholder="삭제 사유를 입력해주세요"
          onSubmit={handleDeleteSubmit}
          onClose={handleModalClose}
        />
      ) : null}
    </>
  );
}
