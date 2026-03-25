import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});

export const label = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.regular,
  color: vars.color.gray800,
});

export const wrapper = style({
  position: 'relative',
  width: '100%',
});

export const trigger = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 20px',
  border: `1px solid ${vars.color.gray300}`,
  borderRadius: '12px',
  backgroundColor: vars.color.white,
  fontSize: vars.font.size.lg,
  color: vars.color.gray800,
  cursor: 'pointer',
});

export const placeholderText = style({
  color: vars.color.gray400,
});

export const dropdown = style({
  position: 'absolute',
  top: 'calc(100% + 16px)',
  left: 0,
  width: '100%',
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.gray300}`,
  borderRadius: '8px',
  zIndex: 100,
  overflow: 'hidden',
});

export const option = style({
  padding: '12px 16px',
  fontSize: vars.font.size.lg,
  color: vars.color.gray800,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.color.gray100,
  },
});

export const optionSelected = style({
  fontWeight: vars.font.weight.semibold,
  backgroundColor: vars.color.gray100,
});
