import { media, vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const cardContainer = style({
  display: 'flex',
  position: 'relative',
  padding: '24px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  // gap: '12px',
  border: `2px solid ${vars.color.gray800}`,
  borderRadius: '12px',
  backgroundColor: vars.color.white,
  '@media': {
    [media.belowIPadMini]: {
      gap: '16px',
    },
  },
});

export const badgeInner = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
});

export const menu = style({
  position: 'absolute',
  top: '24px',
  right: '24px',
});

export const title = style({
  color: vars.color.gray700,
  fontSize: vars.font.size['3xl'],
  fonntWeight: vars.font.weight.semibold,
});

export const badgeContainer = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: '14px',
});

export const divider = style({
  width: '100%',
  height: '1px',
  backgroundColor: vars.color.gray200,
  margin: '12px 0',
});

export const currentStatusContainer = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});
export const statusGroup = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  '@media': {
    [media.belowIPadMini]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      gap: '4px',
    },
  },
});

export const currentStatus = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.regular,
  color: vars.color.gray600,
});
