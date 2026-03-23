import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const paginationBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
});

export const numberButtons = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
});

export const paginationButton = style({
  borderRadius: '8px',
  width: '40px',
  height: '40px',
  color: vars.color.gray400,
  fontWeight: vars.font.weight.medium,
  fontSize: vars.font.size.md,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const paginationButtonActive = style({
  backgroundColor: vars.color.brandDark,
  color: vars.color.brandYellow,
});

export const paginationArrowButton = style({
  selectors: {
    '&:disabled': { pointerEvents: 'none' },
  },
});
