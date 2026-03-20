'use client';

import { useState } from 'react';
import Link from 'next/link.js';
import mockData from '@/mocks/admin-challenges.json';

// TODO: 하림님 컴포넌트 경로/이름 확인 후 수정
// import Modal from '@/components/Common/Modal';
// import Button from '@/components/Common/Button';
// import ListCard from '@/components/Common/ListCard';

import * as styles from './page.css.js';

// 상수
const MENU_MODE = {
  CLOSED: null,
  OPEN: 'open',
};

const MODAL_MODE = {
  CLOSED: null,
  DELETE: 'delete',
};


export default function AdminChallengesList() {
  // todo: 한준님 fetchClient 완성 후 useSuspenseQuery로 교체
  const challenges = mockData.data.list;

  const [openMenuId, setOpenMenuId] = useState(MENU_MODE.CLOSED);
  const [modalMode, setModalMode] = useState(MODAL_MODE.CLOSED);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');

  // 이미 열려있는 메뉴 다시 클릭 시 닫힘
  const handleMenuToggle = (challengeId) => {
    setOpenMenuId((prev) =>
      prev === challengeId ? MENU_MODE.CLOSED : challengeId,
    );
  };

  // 삭제하기 클릭 시
  const handleDeleteClick = (challenge) => {
    setSelectedChallenge(challenge);
    setOpenMenuId(MENU_MODE.CLOSED);
    setModalMode(MODAL_MODE.DELETE);
  };

  
  // 삭제 모달 확인 버튼 클릭 시, 삭제이유가 비어있으면 실행 X
  // todo: 한준님 fetchClient 완성 후 api.delete 호출로 교체
  const handleDeleteConfirm = () => {
    if (!deleteReason.trim()) {
      return;
    }
    console.log('삭제 요청:', selectedChallenge?.id, deleteReason);
    handleModalClose();
  };

  // 모달 닫기 + 상태 초기화
  const handleModalClose = () => {
    setModalMode(MODAL_MODE.CLOSED);
    setDeleteReason('');
    setSelectedChallenge(null);
  };

  return (
    <>
      <h1 className={styles.heading}>챌린지 목록</h1>

      {/* todo: 하림님 필터/검색 컴포넌트 완성 시 추가 */}

      <div className={styles.cardList}>
        {challenges.map((challenge) => (
          <div key={challenge.id} className={styles.cardWrapper}>
            {/* : 메뉴(수정,삭제하기) */}
            <div className={styles.menuWrapper}>
              <button
                className={styles.menuButton}
                onClick={() => handleMenuToggle(challenge.id)}
              >
                <img
                  className={styles.menuIcon}
                  src="/img/btn/menu.svg"
                  alt="챌린지 메뉴"
                />
              </button>

              {openMenuId === challenge.id && (
                <div className={styles.dropdown}>
                  <Link
                    href={`/admin/challengesList/${challenge.id}/edit`}
                    className={styles.dropdownItem}
                  >
                    수정하기
                  </Link>

                  <button
                    className={styles.dropdownItem}
                    onClick={() => handleDeleteClick(challenge)}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>

            {/* todo: 하림님 카드 컴포넌트 완성 시 교체 */}
            <span>{challenge.title}</span>
          </div>
        ))}
      </div>

      {/* todo: 하림님 페이지네이션 컴포넌트 완성 시 추가 */}

      {/* 삭제사유 모달 */}
      {/* todo: 하림님 Modal 완성 시 내부 스타일 맞추기 */}
      {/* {modalMode === MODAL_MODE.DELETE ? (
        <Modal title="삭제 사유" onClose={handleModalClose}>
          <p>내용</p>
          <textarea
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
            placeholder="삭제 사유를 입력해주세요"
            rows={6}
          />
          <Button onClick={handleDeleteConfirm} disabled={!deleteReason.trim()}>
            전송
          </Button>
        </Modal>
      ) : null} */}
    </>
  );
}
