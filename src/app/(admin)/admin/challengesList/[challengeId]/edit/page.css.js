import { style } from '@vanilla-extract/css';
import { vars, media } from '@/styles/tokens.css.js';

// 페이지 제목
export const heading = style({
  fontSize: vars.font.size['2xl'],
  fontWeight: vars.font.weight.semibold,
  color: vars.color.gray800,
  paddingTop: '8px',
  paddingBottom: '8px',
  marginTop: '24px',
  marginBottom: '24px',
});

// FormField들을 세로로 배치 + 각 필드 사이 간격
export const fieldGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%', 
});

// select 전용 래퍼 — FormField 내부 div와 동일한 역할
export const selectWrapper = style({
  display: 'flex',
  flexDirection: 'column',
});

// select용 라벨 — FormField.css.js의 label과 동일하게 맞춤
export const selectLabel = style({
  display: 'block',
  marginBottom: '8px',
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.medium,
});

// select 드롭다운 — FormField.css.js의 baseInput과 동일하게 맞춤
export const select = style({
  width: '100%',
  padding: '11px 20px',
  fontSize: vars.font.size.lg,
  color: vars.color.gray900,
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: '12px',
  outline: 'none',
  boxSizing: 'border-box',
  cursor: 'pointer',
  selectors: {
    '&:focus-visible': {
      outline: `1px solid ${vars.color.brandDark}`,
    },
  },
});

// 수정하기 버튼 영역
export const submitArea = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '40px',

  '@media': {
    [media.iPadMini]: {
      justifyContent: 'flex-end',
    },
  },
});
