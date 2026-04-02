import { style } from '@vanilla-extract/css';

export const like = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  '& img': {
    width: '16px',
    height: '16px',
  },
});
