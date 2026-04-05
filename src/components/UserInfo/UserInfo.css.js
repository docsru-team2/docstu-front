import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
});

export const menuWrapper = style({
  position: 'absolute',
  right: 0,
  top: '40px',
  width: '152px',
  padding: '16px',
  border: `1px solid ${vars.color.gray100}`,
  backgroundColor: vars.color.white,
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
});

export const userInfoGroup = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
});

export const fontGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const nicknameFont = style({
  fontSize: vars.font.size.md,
  color: vars.color.brandDark,
});

export const gradeFont = style({
  fontSize: vars.font.size.xs,
  color: vars.color.gray500,
});

export const divider = style({
  width: '100%',
  borderTop: `2px solid ${vars.color.gray100}`,
  margin: '8px 0 16px 0',
  borderRadius: '999px',
});

export const menuFont = style({
  display: 'block',
  color: vars.color.gray600,
  marginBottom: '10px',
});

export const logOutFont = style({
  color: vars.color.gray400,
  cursor: 'pointer',
});
