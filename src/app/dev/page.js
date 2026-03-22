'use client';

import { Badge } from '@/components/Common/Badge';
import { Button } from '@/components/Common/Button';
import { ChallengeCard } from '@/components/Challenge/ChallengeCard';
import { Container } from '@/components/Common/Container';
import { FormField } from '@/components/Common/FormField';
import mockData from '@/mocks/challenge-detail.json';
import { PaginationBar } from '@/components/Common/PaginationBar';
import { useState } from 'react';
import Pager from '@/components/Common/Pager/Pager';
import SearchBar from '@/components/Common/SearchBar/SearchBar';
import { FilterDropdown } from '@/components/Common/FilterDropdown';
import { EmptyState } from '@/components/Common/EmptyState/EmptyState';

export default function DevPage({ title, setTitle, content, setContent }) {
  // const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [field, setField] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [progressStatus, setProgressStatus] = useState('');
  return (
    <>
      <Container>
        <div>
          <h3>button</h3>
          <Button color="primary">승인하기</Button>
          <Button color="secondary">임시저장</Button>
          <Button color="warning">거절하기</Button>
          <Button color="viewOriginal">원문보기</Button>
          <Button color="openLink">링크열기</Button>
        </div>
        <Container>
          <EmptyState text="우와우와" />
        </Container>
        {/* <div>
        <h3>formfield</h3>
        <FormField
          id="title"
          label="제목"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목을 입력해 주세요"
        />
        <FormField
          id="content"
          label="*내용"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="제목을 입력해 주세요"
          isTextArea={true}
        />
      </div> */}
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
        <SearchBar />
      </Container>
    </>
  );
}
