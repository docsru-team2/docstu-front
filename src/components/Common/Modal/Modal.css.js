import { style } from '@vanilla-extract/css';
import { media, vars } from '@/styles/tokens.css.js';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 20,
});

export const modal = style({
  width: '100%',
  maxWidth: '343px', //496px
  backgroundColor: vars.color.white,
  borderRadius: '12px',
  border: `2px solid ${vars.color.gray800}`,
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    [media.iPadMini]: {
      maxWidth: '496px'
    },
  },

});

export const modalHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '24px',
});

export const modalTitle = style({
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.bold,
  color: vars.color.gray800,
});

export const modalForm = style({
  display: 'flex',
  flexDirection: 'column',
});

export const label = style({
  color: vars.color.gray900,
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.regular,
  paddingBottom: '8px',
});

export const textarea = style({
  display: 'flex',
  height: '219px',
  padding: '16px 20px',
  borderRadius: '6px',
  border: `1px solid ${vars.color.gray300}`,
  backgroundColor: vars.color.white,
  marginBottom: '24px',
  resize: 'none',
  outline: 'none',
  background: 'none',
  selectors: {
    '&::placeholder': {
      color: vars.color.gray500,
      fontSize: vars.font.size.lg,
      fontWeight: vars.font.weight.regular,
    },
  },
});

export const modalMessage = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  paddingBottom: '32px',
  textAlign: 'center',
});

export const modalButton = style({
  width: '90px',
});

export const modalBody = style({
  color: vars.color.gray800,
  fontWeight: 500,
  lineHeight: 1.5,
});

export const modalActions = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
});

export const draftsList = style({
  display: 'flex',
  padding: '12px 0',
  flexDirection: 'column',
});

export const draftsCount = style({
  color: vars.color.brandDark,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.regular,
  paddingBottom: '4px',
});

export const draftButton = style({
  display: 'block',
  width: '100%',
  textAlign: 'left',
  color: vars.color.brandDark,
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.medium,
  padding: '12px 0',
  borderBottom: `1px solid ${vars.color.gray200}`,
});

export const date = style({
  color: vars.color.gray400,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.regular,
  padding: '12px 0',
});
