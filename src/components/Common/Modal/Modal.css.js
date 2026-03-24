import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css.js';


export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // padding: vars.space.lg,
  zIndex: 20,
});

export const modal = style({
  width: '100%',
  maxWidth: '343px', //496px
  backgroundColor: vars.color.white,
  // borderRadius: vars.radius.sm,
  border: `2px solid ${vars.color.gray800}`,
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  // gap: vars.space.md,
});

export const modalHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '24px',
});

export const modalTitle = style({
  fontSize: '18px',
  fontWeight: 700,
  color: vars.color.gray800,
});

export const modalForm = style({
  display: 'flex',
  flexDirection: 'column',
});

export const label = style({
  color: vars.color.gray900,
  fontWeight: 400,
  paddingBottom: '8px'
});

export const textarea = style({
  display: 'flex',
  height: '219px',
  padding: '16px 20px',
  borderRadius: '6px',
  border: `1px solid ${vars.color.gray300}`,
  backgroundColor: vars.color.white,
  marginBottom: '24px'
});

export const modalMessage = style({
  paddingTop: '24px',
  paddingBottom: '32px',
  textAlign: 'center',
});

export const modalBody = style({
  color: vars.color.gray800,
  fontWeight: 500,
  lineHeight: 1.5,
});

export const modalActions = style({
  display: 'flex',
  justifyContent: 'center',
  // gap: vars.space.sm,
});
