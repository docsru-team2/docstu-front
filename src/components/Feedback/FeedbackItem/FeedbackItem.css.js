import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const feedbackContainer = style({
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

export const userContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '8px',
});

export const userInfo = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flexStart',
  color: vars.color.gray800,
  fontWeight: vars.font.weight.medium,
  fontSize: vars.font.size.md,
  gap: '4px',
});

export const createdAtFont = style({
  color: vars.color.gray400,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
});

export const menu = style({
  position: 'absolute',
  top: '16px',
  right: '16px',
  zIndex: 10,
});

export const editTextarea = style({
  display: 'inline-flex',
  width: '100%',
  alignItems: 'flex-start',
  resize: 'none',
  outline: 'none',
  border: 'none',
  backgroundColor: vars.color.white,
  color: vars.color.gray700,
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.medium,
  selectors: {
    '&:focus': {
      outline: 'none',
    },
  },
});

export const editingFeedbackContainer = style({
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.gray200}`,
  minHeight: '0',
   display: 'flex',
  flexDirection: 'column',
});

export const buttonWrapper = style({
  display: 'flex',
  gap: '4px',
});

export const editButton = style({
  width: '80px',
});

export const cancelButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '64px',
});
