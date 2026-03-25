import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  margin: '24px auto 34px auto',
  maxWidth: '560px',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 118px)',
});

export const title = style({
  fontSize: vars.font.size['2xl'],
  fontWeight: vars.font.weight.semibold,
  marginBottom: '32px',
});
