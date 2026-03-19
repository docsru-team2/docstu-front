'use client';

import { useState } from 'react';
import mockData from '@/mocks/admin-challenges.json';


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
    setOpenMenuId((prev) => (prev === challengeId ? MENU_MODE.CLOSED : challengeId));
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
      retrun;
    }
    console.log('삭제 요청:', selectedChallenge?.id, deleteReason);
    setModalMode(MODAL_MODE.CLOSED);
    setDeleteReason('');
    setSelectedChallenge(null);
  }

  // 모달 닫기
  const handleModalClose = () => {
    setModalMode(MODAL_MODE.CLOSED);
    setDeleteReason('');
    setSelectedChallenge(null);
  }


  return (
    <div>
      {challenges.map((challenge) => {
        return (
          // todo:챌린지 카드 컴포넌트 작성시 div 교체
          <div key={challenge.id}>
            {/* todo: 하림님 카드 컴포넌트 완성 시 Link 위치 조정 */}
            <span>{challenge.title}</span>
          </div>
        );
      })}
    </div>
  );
}
