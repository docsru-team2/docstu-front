import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';

export const heroWrapper = style({
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  height: '278px',
  position: 'relative', // fill 쓰려면 필수
});

export const content = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const textStyle = style({
  fontSize: vars.font.size['4xl'],
  color: 'white',
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.normal,
  textAlign: 'center',
  margin: '16px 0 26px 0',
});
