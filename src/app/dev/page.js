'use client';

import { Badge } from '@/components/Common/Badge';
import { ChallengeCard } from '@/components/Challenge/ChallengeCard';
import { Container } from '@/components/Common/Container';
import { FormField } from '@/components/Common/FormField';
import mockData from '@/mocks/challenge-detail.json';
import { Button } from '@/components/Common/Button';
import pluse from '@public/img/btn/plus.svg';

export default function DevPage({ title, setTitle, content, setContent }) {
  return (
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
      <div>
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
      </div>
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
      <ChallengeCard data={mockData.data} />
    </Container>
  );
}
