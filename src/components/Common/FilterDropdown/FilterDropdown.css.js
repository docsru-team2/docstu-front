import { media } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const dropdownContent = style({
  position: 'fixed',
  inset: 0,
  background: '#fff',
  zIndex: 1000,
   overflowY: 'auto',

  overflowY: 'auto',
  '@media': {
    [media.tablet]: {
      position: 'absolute',
      inset: 'auto',
      top: '100%',
      left: 0,
      width: '240px',
      
      border: '1px solid #ddd',
      borderRadius: '8px',
    },
  },
});

export const header = style({
  position: 'sticky',
  top: 0,
  background: '#fff',
  padding: '16px',
  borderBottom: '1px solid #eee',
});

export const closeButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});
