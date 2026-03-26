import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: '24px 0',
});

export const titleContainer = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const titleText = style({
  fontSize: vars.font.size['2xl'],
  fontWeight: vars.font.weight.semibold,
});

export const btnGroup = style({
  width: '154px',
});

export const tabContainer = style({
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${vars.color.gray300}`,
});

export const tab = style({
  padding: '16px 24px',
  border: 'none',
  color: vars.color.gray500,
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.semibold,
});

export const active = style({
  color: vars.color.brandDark,
  borderBottom: `3px solid ${vars.color.brandDark}`,
});
