import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';

export const wrapper = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  width: '100%',
  height: '60px',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: `1px solid ${vars.color.gray100}`,
});

export const inner = style({
  maxWidth: '1920px',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 360px',
});

export const navGroup = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  gap: '42px',
  fontSize: vars.font.size.lg,
  color: vars.color.gray500,
  fontWeight: vars.font.weight.semibold,
});

export const active = style({
  color: vars.color.gray800,
  fontWeight: vars.font.weight.bold,
});
