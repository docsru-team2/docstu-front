import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  margin: '40px 0 18px 0',
});

export const inputGroup = style({
  position: 'relative',
});

export const input = style({
  width: '100%',
  padding: '12px 20px',
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: '12px',
  fontSize: '14px',

  selectors: {
    '&::placeholder': {
      color: vars.color.gray400,
    },
  },

  // 포커스 상태
  ':focus': {
    outline: 'none',
    borderColor: 'blue',
  },
});

export const label = style({
  display: 'block',
  marginBottom: '8px',
});

export const inputIcon = style({
  position: 'absolute',
  right: '20px',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
});
