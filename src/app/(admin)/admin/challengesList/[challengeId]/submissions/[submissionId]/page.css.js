import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css.js';

export const container = style({
  width: '100%',
  maxWidth: '890px',
  margin: '0 auto',
  paddingTop: '40px',
});

export const feedbackContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginTop: '24px',
});

export const formContainer = style({
  position: 'relative',
});

export const feedbackTextarea = style({
  display: 'inline-flex',
  width: '100%',
  resize: 'none',
  outline: 'none',
  padding: '16px',
  height: '89px',
  borderRadius: '12px',
  border: `1px solid ${vars.color.gray200}`,
  backgroundColor: vars.color.white,
  color: vars.color.gray700,
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.medium,
  selectors: {
    '&:focus': { outline: 'none' },
    '&::placeholder': { color: vars.color.gray400 },
  },
});

export const submitButton = style({
  position: 'absolute',
  bottom: '16px',
  right: '16px',
  zIndex: 10,
  color: vars.color.gray500,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});

export const feedbackList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const feedbackItem = style({
  display: 'flex',
  padding: '16px',
  flexDirection: 'column',
  backgroundColor: vars.color.gray50,
  gap: '12px',
  borderRadius: '12px',
  color: vars.color.gray700,
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.regular,
  position: 'relative',
});

export const feedbackUserContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const feedbackUserInfo = style({
  display: 'flex',
  flexDirection: 'column',
  color: vars.color.gray800,
  fontWeight: vars.font.weight.medium,
  fontSize: vars.font.size.md,
  gap: '4px',
});

export const feedbackDate = style({
  color: vars.color.gray400,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
});

export const feedbackMenu = style({
  position: 'absolute',
  top: '16px',
  right: '16px',
  zIndex: 10,
});
