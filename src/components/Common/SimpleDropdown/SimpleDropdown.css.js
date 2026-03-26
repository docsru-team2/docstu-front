import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';
export const menuWrapper = style({
  position: 'relative',
  display: 'inline-block',
  zIndex: 5,
});

export const filterWrapper = style({
  position: 'relative',
  width: '100%',
  zIndex: 5,
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
  marginTop: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '138px',
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
  fontSize: vars.font.size.lg,
  color: vars.color.gray500,
  textDecoration: 'none',
  textAlign: 'center',
  borderBottom: `1px solid ${vars.color.gray200}`,
  cursor: 'pointer',
});

export const filterDropdown = style({
  position: 'absolute',
  top: '100%',
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '138px',
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: '8px',
  zIndex: 10,
  overflow: 'hidden',
  marginTop: '8px',
});

export const filterButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  width: '100%',
  height: '40px',
  padding: '8px 8px 8px 12px',
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.gray300}`,
  borderRadius: '999px',
  fontSize: vars.font.size.lg,
  color: vars.color.gray500,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
});
