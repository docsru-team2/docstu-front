// src/app/(admin)/admin/challengesList/page.css.js
import { style } from '@vanilla-extract/css';
import { vars, media } from '@/styles/tokens.css.js';

export const heading = style({
  fontSize: vars.font.size['2xl'],
  fontWeight: vars.font.weight.semibold,
  color: vars.color.gray800,
  paddingTop: '8px',
  paddingBottom: '8px',
  marginTop: '24px',
  // marginBottom: '16px',
});

export const filterBar = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  marginBottom: '16px',

  '@media': {
    [media.tablet]: {
      marginBottom: '24px',
    },
  },
});

export const cardList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  marginBottom: '24px',

  '@media': {
    [media.tablet]: {
      marginBottom: '40px',
    },
  },
});

export const cardWrapper = style({
  position: 'relative',
  display: 'flex',
  padding: '24px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  borderRadius: '12px',
  border: `2px solid ${vars.color.gray800}`,
  backgroundColor: vars.color.white,
});

export const menuWrapper = style({
  position: 'absolute',
  top: '24px',
  right: '24px',
  zIndex: 5,
});

export const menuButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  lineHeight: 1,
});

export const menuIcon = style({
  width: '24px',
  height: '24px',
  display: 'block',
});

export const dropdown = style({
  position: 'absolute',
  top: '100%',
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '139px',
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  zIndex: 10,
  overflow: 'hidden',
});

export const dropdownItem = style({
  display: 'block',
  width: '100%',
  padding: '10px 16px',
  fontSize: vars.font.size.md,
  color: vars.color.gray700,
  textDecoration: 'none',
  textAlign: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});
