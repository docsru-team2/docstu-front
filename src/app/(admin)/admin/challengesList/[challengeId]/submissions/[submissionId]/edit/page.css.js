import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css.js';

export const container = style({
  width: '100%',
  maxWidth: '890px',
  margin: '0 auto',
  paddingTop: '40px',
});

export const title = style({
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.gray800,
});

export const buttonWrapper = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '16px',
  marginBottom: '16px',
});

export const editor = style({
  width: '100%',
  minHeight: '400px',
  padding: '16px',
  fontSize: vars.font.size.lg,
  lineHeight: '160%',
  color: vars.color.gray800,
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: '8px',
  resize: 'vertical',

  '::placeholder': {
    color: vars.color.gray400,
  },
});
