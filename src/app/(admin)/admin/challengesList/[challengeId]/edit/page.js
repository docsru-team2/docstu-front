'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

// todo: BE 어드민 챌린지 API 구현시 수정
import mockData from '@/mocks/admin-challenge-detail.json';
import { updateChallenge } from '@/lib/api/adminChallengeApi';
import { DOCUMENT_TYPE_MAP, FIELD_MAP } from '@/constants/challengeConstants';

import FormField from '@/components/Common/FormField';
import Button from '@/components/Common/Button';

import * as styles from './page.css.js';


// 폼 초기값 - 서버 데이터 받기 전 빈 상태
const INITIAL_FORM = {
  title: '',
  sourceUrl: '',
  field: '',
  documentType: '',
  deadline: '',
  maxParticipants: '',
  description: '',
};

export default function AdminChallengeEditPage() {
  const { challengeId } = useParams();
  const router = useRouter();

  const [form, setForm] = useState(INITIAL_FORM);
  
  // 현재 참여인원 - 최대인원 유효성 검사에 사용(현재 참여자보다 작게 설정 불가)
  const [currentParticipants, setCurrentParticipants] = useState(0);

  // 제출 중 상태 - true일때 버튼 비활성화로 중복 제출 방지
  const [isSubmitting, setIsSubmitting] = useState(false);

  // todo: BE 어드민 챌린지 API 구련 시 수정(시드는 있으나 라우트 없음)
  // BE API 완성 후 mock 제거 → fetchAdminChallengeDetail + useSuspenseQuery로 교체
  useEffect(() => {
    const challenge = mockData.data;
    setForm({
      title: challenge.title,
      sourceUrl: challenge.sourceUrl,
      field: challenge.field,
      documentType: challenge.documentType,
      // deadline이 ISO 형식(2026-02-02T23:59:59.000Z)이라 date input용으로 앞부분만 사용
      deadline: challenge.deadline.split('T')[0],
      maxParticipants: challenge.maxParticipants,
      description: challenge.description,
    });
    // 현재 참여인원 - null및 undefined 방어를 위해 '?? 0' 추가
    setCurrentParticipants(challenge.currentParticipants ?? 0);
  }, [challengeId]); // challengId가 바뀌면 실행
  
  const handleChange = (fieldName) => (e) => {
    setForm((prev) => ({...prev, [fieldName]: e.target.value}));
  };

  // 최대인원 유효성 검사 - 현재 참여 인원보다 작게 설정 불가(요구사항)
  const isMaxParticipantsInvalid = 
  form.maxParticipants !== '' && 
  Number(form.maxParticipants) < currentParticipants;
    

  const isFormValid = 
    form.title.trim() &&
    form.sourceUrl.trim() &&
    form.field &&
    form.documentType &&
    form.deadline &&
    form.maxParticipants &&
    form.description.trim() &&
    !isMaxParticipantsInvalid;
    
  // todo: BE 어드민 챌린지 수정 API(PATCH /admin/challenges/:id) 미구현 — 완성 후 동작 확인
  const handleSubmit = async () => {
    // 폼 미완성이거나 이미 제출 중이면 바로 리턴
    if (!isFormValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      // 최대 참여인원을 Number로 반환
      await updateChallenge(challengeId, {
        ...form,
        maxParticipants: Number(form.maxParticipants),
      });
      // 수정 완료 후 목록으로 이동
      router.push('/admin/challengesList');
    } catch (error) {
      console.error('수정 실패:', error);
    } finally {
      // 성공/실패 상관없이 제출 상태 해제
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>챌린지 수정하기</h1>

      <div className={styles.fieldGroup}>
        {/* FormField: 공통 컴포넌트 - label + 인풋 자체 스타일 포함 */}
        <FormField
          id="title"
          label="제목"
          value={form.title}
          onChange={handleChange('title')}
          placeholder="제목을 입력해주세요"
        />

        {/* 원문 링크 - 피그마에 있음 */}
        <FormField
          id="sourceUrl"
          label="원문 링크"
          value={form.sourceUrl}
          onChange={handleChange('sourceUrl')}
          placeholder="원문 링크를 입력해주세요"
        />

        {/* 분야 - 폼필드가 select를 지원안해서 직접 작성 */}
        {/* todo: FIELD_MAP에 ETC 누락 — challengeConstants.js에 추가 필요 (ERD에는 있음) */}
        <div className={styles.selectWrapper}>
          <label className={styles.selectLabel} htmlFor="field">분야</label>
          <select
            id="field"
            className={styles.select}
            value={form.field}
            onChange={handleChange('field')}
          >
            <option value="">분야를 선택해주세요</option>
            
            {/* .entries() = 객체를 [키, 값] 쌍의 배열로 변환하는 함수 */}
            {Object.entries(FIELD_MAP).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* 문서 타입 */}
        <div className={styles.selectWrapper}>
          <label className={styles.selectLabel} htmlFor='documentType'>
            문서 타입
          </label>
          <select
            id="documentType"
            className={styles.select}
            value={form.documentType}
            onChange={handleChange('documentType')}
          >
            <option value="">문서 타입을 선택해주세요</option>

            {Object.entries(DOCUMENT_TYPE_MAP).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
         
        {/* 마감일 */}
        <FormField
          id="deadline"
          label="마감일"
          type="date"
          value={form.deadline}
          onChange={handleChange('deadline')}
        />
 
        {/* 최대 인원 — errorMessage prop으로 유효성 검사 결과 자동 표시 */}
        <FormField
          id="maxParticipants"
          label="최대 인원"
          type="number"
          value={form.maxParticipants}
          onChange={handleChange('maxParticipants')}
          placeholder="최대 인원을 입력해주세요"
          errorMessage={
            isMaxParticipantsInvalid
              ? `현재 참여 인원(${currentParticipants}명)보다 작게 설정할 수 없습니다`
              : undefined
          }
        />
 
        {/* 내용 */}
        <FormField
          id="description"
          label="내용"
          isTextArea
          value={form.description}
          onChange={handleChange('description')}
          placeholder="내용을 입력해주세요"
        />
      </div>

      {/* width는 부모 submitArea가 조절 — Button 자체는 width: 100% */}
      <div className={styles.submitArea}>
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? '수정 중...' : '수정하기'}
        </Button>
      </div>
    </div>
  );
}