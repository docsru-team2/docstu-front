import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100dvh',
  gap: '16px'
});

export const text = style({
  color: vars.color.gray500,
  fontSize: vars.font.size.md,
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
});
