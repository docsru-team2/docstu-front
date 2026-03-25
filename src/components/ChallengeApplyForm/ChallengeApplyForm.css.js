import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
});

export const inputWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '24px',
  gap: '8px',
});

export const inputWrapperFlex = style({
  flex: 1,
});


export const inputContainer = style({
  padding: '14px 20px',
  width: '100%',
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: '12px',

  selectors: {
    '&::placeholder': {
      fontWeight: vars.font.weight.regular,
      fontSize: vars.font.size.lg,
      color: vars.color.gray400,
    },
  },
});

export const textarea = style({
  flex: 1,
  padding: '16px 20px',
  resize: 'none',
  overflowY: 'auto',
});

