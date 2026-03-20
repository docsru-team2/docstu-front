import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';


const baseInput = {
  width: '100%',
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: '12px',
  backgroundColor: vars.color.white,
  color: vars.color.gray900,
  padding: '11px 20px',
  fontSize: vars.font.size.lg,
};

export const label = style({
  display: 'block',
  marginBottom: '8px',
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.medium,
});

export const input = style({
  ...baseInput,
  selectors: {
    '&::placeholder': {
      color: vars.color.gray400,
    },
    '&:focus-visible': {
      outline: `1px solid ${vars.color.brandDark}`,
    },
  },
});

export const textarea = style([
  input,
  {
    resize: 'none',
    minHeight: '219px',
  },
]);

export const error = style({
  color: vars.color.error,
  display: 'block',
  marginTop: '8px',
  fontWeight: 400,
  fontSize: '12px',
});

export const inputError = style({
  outline: `1px solid ${vars.color.error}`,
});