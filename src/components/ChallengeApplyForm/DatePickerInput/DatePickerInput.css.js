import { vars } from '@/styles/tokens.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const dateWrapper = style({
  position: 'relative',
  width: '100%',
  cursor: 'pointer',
});

globalStyle(`${dateWrapper} input`, {
  cursor: 'pointer',
});

export const dateImg = style({
  position: 'absolute',
  right: '20px',
  top: '50%',
  transform: 'translateY(-50%)',
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

globalStyle('.react-datepicker-popper .react-datepicker__triangle', {
  display: 'none',
});
