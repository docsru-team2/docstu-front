import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const pagerContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
});

export const pager = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '62px',
  height: '24px',
  borderRadius: '13px',
  backgroundColor: vars.color.gray50,
  color: vars.color.gray800,
  fontSize: vars.font.size.sm,
  gap: '4px',
});

export const activePageNum = style({
  color: vars.color.brandYellow,
});

export const pagerButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  selectors: {
    '&:disabled': { pointerEvents: 'none' },
  },
});
