import { media } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const searchBarContainer = style({
  margin: '24px 0',
});

export const cardList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  marginBottom: '24px',

  '@media': {
    [media.iPadMini]: {
      marginBottom: '40px',
    },
  },
});
