import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';
export const menuWrapper = style({
  position: 'relative',
  zIndex: 5
});

export const menuButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  lineHeight: 1,
});

export const menuIcon = style({
  width: '24px',
  height: '24px',
  display: 'block',
});

export const dropdown = style({
  position: 'absolute',
  top: '100%',
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '139px',
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: '8px',
  zIndex: 10,
  overflow: 'hidden',
});

export const dropdownItem = style({
  display: 'block',
  width: '100%',
  padding: '12px 17px',
  fontSize: vars.font.size.md,
  color: vars.color.gray500,
  textDecoration: 'none',
  textAlign: 'center',
  borderBottom: `1px solid ${vars.color.gray200}`,
  cursor: 'pointer',
});
