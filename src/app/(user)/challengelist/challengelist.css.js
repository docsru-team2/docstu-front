import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';

export const wrapper = style({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  margin: '24px 0 32px 0',
});

export const titleContainer = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',
});

export const titleText = style({
  fontSize: vars.font.size['2xl'],
  fontWeight: vars.font.weight.semibold,
});

export const btnGroup = style({
  width: '154px',
});

export const filterGroup = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '12px',
  marginBottom: '12px',
});

export const cardWrapper = style({
  display: 'flex',
  flexDirection: 'column',
});

export const cardItem = style({
  marginBottom: '24px',
  selectors: {
    '&:last-child': {
      marginBottom: '40px',
    },
  },
});
