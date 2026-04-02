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
