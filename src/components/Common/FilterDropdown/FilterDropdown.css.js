import { media, vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const filterContainer = style({
  position: 'relative',
});

export const dropdownTrigger = style({
  display: 'flex',
  backgroundColor: vars.color.white,
  color: vars.color.gray400,
  height: '40px',
  width: '106px',
  padding: '8px 12px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  fontSize: vars.font.size.lg,
  borderRadius: '999px',
  border: `1px solid ${vars.color.gray300}`,
});

export const filterInner = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const active = style({
  background: vars.color.gray800,
  color: vars.color.gray50,
});

export const dropdownContent = style({
  position: 'fixed',
  inset: 0,
  background: '#fff',
  zIndex: 1000,
  overflowY: 'auto',

  overflowY: 'auto',
  '@media': {
    [media.tablet]: {
      position: 'absolute',
      inset: 'auto',
      top: 'calc(100% + 8px)',
      left: 0,
      width: '343px',

      border: '1px solid #ddd',
      borderRadius: '8px',
    },
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px',
  color: vars.color.gray800,
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
});

export const closeButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});

export const optionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  justifyContent: 'flex-start',
  gap: '12px',
  borderBottom: `1px solid ${vars.color.gray200}`,
  fontWeight: vars.font.weight.semibold,
  fontSize: vars.font.size.md,
  color: vars.color.gray800,
});

export const options = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const option = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontWeight: vars.font.weight.regular,
});

export const hiddenInput = style({
  display: 'none',
});
