import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${vars.color.gray200}`,
  //   backgroundColor: vars.color.gray50,
  backgroundColor: vars.color.gray100,
  borderRadius: '16px',
  padding: '24px',
});

export const titleText = style({
  color: vars.color.brandDark,
  fontWeight: vars.font.weight.semibold,
  marginBottom: '12px',
});

export const contentText = style({
  color: vars.color.gray700,
  fontWeight: vars.font.weight.medium,
  marginBottom: '16px',
  whiteSpace: 'pre-wrap',
  textAlign: 'center',
  width: '80%',
});

export const dateText = style({
  color: vars.color.gray500,
  fontWeight: vars.font.weight.regular,
  width: '100%',
  textAlign: 'end',
});
export const underLine = style({
  width: '100%',
  borderTop: `1px solid ${vars.color.gray200}`,
  marginTop: '16px',
});
