import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';

export const wrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const bottomGroup = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '124px',
});

export const bttomText = style({
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.semibold,
  marginBottom: '20px',
});

export const btnWrapper = style({
  width: '153px',
});
