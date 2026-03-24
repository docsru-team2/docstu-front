'use client';

import { Badge } from '@/components/Common/Badge';
import { ChallengeCard } from '@/components/Challenge/ChallengeCard';
import { Container } from '@/components/Common/Container';
import { FormField } from '@/components/Common/FormField';
import mockData from '@/mocks/challenge-detail.json';
import { Button } from '@/components/Common/Button';
import pluse from '@public/img/btn/plus.svg';
//import { FormField } from '@/components/Common/FormField';
import { PaginationBar } from '@/components/Common/PaginationBar';
import { useState } from 'react';

import { FilterDropdown } from '@/components/Common/FilterDropdown';
import { EmptyState } from '@/components/Common/EmptyState/EmptyState';
import { SearchBar } from '@/components/Common/SearchBar';
import { Pager } from '@/components/Common/Pager';
import SimpleDropdown from '@/components/Common/SimpleDropdown/SimpleDropdown';
import { SimpleModal } from '@/components/Common/SimpleDropdown';
import {
  ConfirmModal,
  LoadDraftsModal,
  ReasonModal,
} from '@/components/Common/Modal';

export default function DevPage({ title, setTitle, content, setContent }) {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [field, setField] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [progressStatus, setProgressStatus] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [reasonOpen, setReasonOpen] = useState(false);
  const [loadDraftsOpen, setLoadDraftsOpen] = useState(false);
  const data = [
    { id: 1, title: '임시글1', updatedAt: '2026-03-24' },
    { id: 2, title: '임시글2', updatedAt: '2026-03-23' },
  ];
  return (
    <>
      <Container>
        <div>
          <h3>button</h3>

          {/* color variants */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              width: '200px',
            }}
          >
            <Button color="primary" size="md">
              primary
            </Button>
            <Button color="secondary" size="md">
              secondary
            </Button>
            <Button color="viewOriginal" size="md">
              viewOriginal
            </Button>
            <Button color="abandon" size="md">
              abandon
            </Button>
            <Button color="opacity" size="md">
              opacity
            </Button>
          </div>

          {/* size variants */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              width: '200px',
              marginTop: '16px',
            }}
          >
            <Button size="sm">size sm (32px)</Button>
            <Button size="md">size md (40px)</Button>
            <Button size="lg">size lg (48px)</Button>
          </div>

          {/* fullWidth */}
          <div style={{ width: '518px', marginTop: '16px' }}>
            <Button size="lg">fullWidth (부모 너비로 조절)</Button>
          </div>

          {/* roundBtn */}
          <div style={{ width: '200px', marginTop: '16px' }}>
            <Button size="lg" roundBtn>
              roundBtn
            </Button>
          </div>

          {/* hasIcon */}
          <div style={{ width: '200px', marginTop: '16px' }}>
            <Button size="lg" hasIcon={pluse}>
              hasIcon
            </Button>
          </div>

          {/* disabled */}
          <div style={{ width: '200px', marginTop: '16px' }}>
            <Button size="md" disabled>
              disabled
            </Button>
          </div>

          {/* href - Link */}
          <div style={{ width: '200px', marginTop: '16px' }}>
            <Button href="/" size="md" color="secondary" fontSize>
              href Link
            </Button>
          </div>
        </div>
        <FilterDropdown
          field={field}
          documentType={documentType}
          progressStatus={progressStatus}
          onApply={({ field, documentType, progressStatus }) => {
            setField(field);
            setDocumentType(documentType);
            setProgressStatus(progressStatus);
            setPage(1);
          }}
        />
        <ChallengeCard data={mockData.data} />
        <PaginationBar totalPages={10} page={page} setPage={setPage} />
        <Pager totalPages={10} page={page} setPage={setPage} />
        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          setPage={setPage}
        />
        <SimpleDropdown
          items={[
            {
              key: 'edit',
              label: '수정하기',
              href: `/`,
            },
            {
              key: 'delete',
              label: '삭제하기',
              action: () => handleDelete(challenge.id),
            },
          ]}
        />
      </Container>

      <Container>
        <div>
          <h3>Badge</h3>
          <Badge badgeStyle="field" color="nextjs">
            Next.js
          </Badge>
          <Badge badgeStyle="documentType" color="primary">
            공식문서
          </Badge>
          <Badge badgeStyle="reviewStatus" color="pending">
            승인대기
          </Badge>
          <Badge badgeStyle="closeStatus" color="closedFull">
            모집이 완료된 상태에요
          </Badge>
        </div>
        <FilterDropdown
          field={field}
          documentType={documentType}
          progressStatus={progressStatus}
          onApply={({ field, documentType, progressStatus }) => {
            setField(field);
            setDocumentType(documentType);
            setProgressStatus(progressStatus);
            setPage(1);
          }}
        />
        <ChallengeCard data={mockData.data} />
        <PaginationBar totalPages={10} page={page} setPage={setPage} />
        <Pager totalPages={10} page={page} setPage={setPage} />
        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          setPage={setPage}
        />
      </Container>
      <Container>
        <>
          <Button onClick={() => setConfirmOpen(true)}>확인 모달 열기</Button>
          {confirmOpen && (
            <ConfirmModal
              message="정말 삭제하시겠습니까?"
              onConfirm={() => {
                console.log('삭제됨');
                setConfirmOpen(false);
              }}
              onClose={() => setConfirmOpen(false)}
              singleButton={false}
            />
          )}
        </>
        <>
          <Button onClick={() => setReasonOpen(true)}> 사유 모달 열기</Button>
          {reasonOpen && (
            <ReasonModal
              title="신고 사유 입력"
              placeholder="사유를 입력해주세요"
              onSubmit={(reason) => {
                console.log(reason);
                setReasonOpen(false);
              }}
              onClose={() => setReasonOpen(false)}
            />
          )}
        </>

        <>
          <Button onClick={() => setLoadDraftsOpen(true)}>
            {' '}
            임시저장모달 열기
          </Button>
          {loadDraftsOpen && (
            <LoadDraftsModal
              data={data}
              onClose={() => setLoadDraftsOpen(false)}
              onSelectDraft={(draft) => {
                console.log('선택된 글:', draft);
              }}
            />
          )}
        </>
      </Container>
    </>
  );
}
