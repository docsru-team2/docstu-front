import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  maxWidth: '890px',
  position: 'relative',
  background: '#ffffffff',
  margin: '0 auto',
  padding: '40px 0 24px 0',
  '& aside': {
    borderTop: '1px solid',
    borderBottom: '1px solid',
    borderColor: vars.color.gray200,
    padding: '12px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& span': {
      color: vars.color.gray500,
      fontSize: vars.font.size.md,
      fontWeight: '500',
      lineHeight: 'normal',
    },
  },
  '& section': {
    '& p': {
      color: vars.color.gray800,
      fontSize: vars.font.size.lg,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '160%',
      padding: '24px 0 64px 0',
      borderBottom: '1px solid',
      borderColor: vars.color.gray200,
    },
  },
});

export const top = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const tab = style({
  display: 'flex',
  gap: '8px',
  margin: '16px 0',
});

export const user = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  '& span': {
    fontSize: '12px',
    color: vars.color.gray800,
  },
});

export const asideInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});
