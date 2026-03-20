// src/app/(admin)/admin/challengesList/page.css.js
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css.js';

export const heading = style({
  fontSize: vars.font.size['2xl'],
  fontWeight: vars.font.weight.semibold,
  color: vars.color.gray800,
  marginBottom: '1rem',
});

export const cardList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const cardWrapper = style({
  position: 'relative',
});

export const menuWrapper = style({
  position: 'absolute',
  top: '12px',
  right: '12px',
  zIndex: 5,
});

export const menuButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '4px',
  lineHeight: 1,
});

export const menuIcon = style({
  width: '1.5rem',
  height: '1.5rem',
  display: 'block',
});

export const dropdown = style({
  position: 'absolute',
  top: '100%',
  right: 0,
  minWidth: '120px',
  backgroundColor: '#fff',
  border: '1px solid #e5e5e5',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  zIndex: 10,
  overflow: 'hidden',
});

export const dropdownItem = style({
  display: 'block',
  width: '100%',
  padding: '10px 16px',
  fontSize: '14px',
  color: '#404040',
  textDecoration: 'none',
  textAlign: 'left',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});