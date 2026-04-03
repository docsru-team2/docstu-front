import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css.js';

export const container = style({
  width: '100%',
  maxWidth: '890px',
  margin: '0 auto',
  paddingTop: '40px',
});

export const top = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const title = style({
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.gray800,
});

export const badgeGroup = style({
  display: 'flex',
  gap: '8px',
  marginTop: '16px',
});

export const meta = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: `1px solid ${vars.color.gray200}`,
  borderBottom: `1px solid ${vars.color.gray200}`,
  padding: '12px 0',
  marginTop: '16px',
  color: vars.color.gray500,
  fontSize: vars.font.size.md,
});

export const content = style({
  fontSize: vars.font.size.lg,
  color: vars.color.gray800,
  lineHeight: '160%',
  padding: '24px 0 64px 0',
  borderBottom: `1px solid ${vars.color.gray200}`,
});

export const feedbackSection = style({
  marginTop: '24px',
});

export const feedbackTitle = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.gray800,
  marginBottom: '16px',
});

export const feedbackItem = style({
  padding: '16px 0',
  borderBottom: `1px solid ${vars.color.gray200}`,
});

export const feedbackHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '8px',
  fontSize: vars.font.size.md,
  color: vars.color.gray500,
});
