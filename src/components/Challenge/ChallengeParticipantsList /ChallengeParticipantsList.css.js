import { media, vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const listContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '7px',
  padding: '21px 24px',
  borderRadius: '16px',
  border: `2px solid ${vars.color.gray800}`,
  backgroundColor: vars.color.white,
});

export const listHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: vars.color.gray800,
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.semibold,
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const item = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '12px 0',
  borderBottom: `1px solid ${vars.color.gray200}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const leftWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '24px',
  '@media': {
    [media.belowMobile]: {
      gap: '12px',
    },
  },
});

export const rank = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '51px',
  height: '21px',
  padding: '2px 7px',
  gap: '2px',
  alignItems: 'center',
  borderRadius: '16px',
  backgroundColor: vars.color.gray800,
  color: vars.color.brandYellow,
});

export const userWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.medium,
});

export const gradeFont = style({
  color: vars.color.gray500,
  fontSize: vars.font.size.xs,
});

export const rightWrapper = style({
  display: 'flex',
  width: '200px',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '30px',
});

export const likeCount = style({
  display: 'flex',
  color: vars.color.gray500,
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.medium,
  gap: '4px',
});

export const link = style({
  display: 'flex',
  alignItems: 'center',
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
});
