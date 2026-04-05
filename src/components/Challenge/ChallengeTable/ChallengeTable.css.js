import { media, vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const tableWrapper = style({
  width: '100%',
  '@media': {
    [media.belowMobile]: {
      width: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      WebkitOverflowScrolling: 'touch',
    },
  },
});

export const gridTable = style({
  display: 'grid',
  flexDirection: 'column',
  overflow: 'hidden',
  gridTemplateColumns:
    '68px minmax(73px, 84px) minmax(69px, 84px) minmax(221px, 1fr) minmax(46px, 94px) minmax(67px, 94px) minmax(67px, 94px) minmax(85px, 120px)',
  minWidth: '696px',
  width: '100%',
});

export const gridHeader = style({
  display: 'contents',
  height: '36px',

  borderRadius: '8px',
});

export const rowLinkWrapper = style({
  display: 'contents',
  cursor: 'pointer',
});

export const gridRow = style({
  display: 'contents',
  borderRadius: '4px',
});

export const cellHeader = style({
  backgroundColor: vars.color.gray800,
  color: vars.color.white,
  padding: '11px 16px',
  fontSize: vars.font.size.sm,
  marginBottom: '7px',
  whiteSpace: 'nowrap',
  selectors: {
    '&:first-child': {
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
    },
    '&:last-child': {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
    },
  },
});

export const cell = style({
  borderBottom: `1px solid ${vars.color.gray300}`,
  fontSize: vars.font.size.md,
  backgroundColor: vars.color.white,
  color: vars.color.gray500,
  padding: '11px 16px',
  alignItems: 'center',
  display: 'flex',
  whiteSpace: 'nowrap',
  selectors: {
    [`${rowLinkWrapper}:hover &`]: {
      backgroundColor: vars.color.gray50,
    },
  },
});

export const title = style({
  color: vars.color.gray700,
  fontSize: vars.font.size.sm,
  fonstWeight: vars.font.weight.medium,
});
