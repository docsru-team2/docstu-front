import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  '& section': {
    width: '80vw',
    maxWidth: '343px',
    maxHeight: '465px',
    maxHeight: '465px',
    background: '#fff',
    borderRadius: '8px',
    border: '2px solid var(--gray-gray200, #E5E5E5)',
    display: 'inline-block',
    position: 'absolute',
    top: '33px',
    right: '0',
    padding: '0px',
    overflow: 'auto'
  },
});

export const unreadCount = style({
  width: '18px',
  height: '18px',
  lineHeight: '18px',
  fontSize: '12px',
  textAlign: 'center',
  color: '#fff',
  background: '#ff5c48',
  border: '1px solid #fff',
  borderRadius: '100px',
  display: 'inline-block',
  position: 'absolute',
  top: '-6px',
  right: '-6px',
  zIndex: '2',
});

export const menu = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#fff',
  padding: '15px 16px',
  position: 'sticky',
  top: '0',
  left: '0',
  zIndex: '2',
  '& h1': {
    color: 'var(--gray-gray800, #262626)',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
    '& i': {
      fontStyle: 'normal',
    },
  },
});

export const tab = style({
  display: 'flex',
  gap: '5px',
  fontSize: vars.font.md,
});

export const list = style({
  color: vars.color.gray500,
  fontSize: vars.font.md,
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: 'normal',
  '& li': {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px 16px',
    borderBottom: '1px solid #e5e5e5',
    position: 'relative',
  },
  '& li:last-child': {
    borderBottom: 'none !important',
  },
});

export const active = style({
  color: '#7a7a7a',
});

export const dateCheck = style({
  color: '#a3a3a3',
});

export const deleteOne = style({
  display: 'inline-block',
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '16px',
  fontStyle: 'normal',
  color: '#393939',
  fontFamily: 'ui-rounded',
});
export const allCheck = style({
  color: '#5353da',
  textAlign: 'center',
  fontSize: '13px',
  padding: '20px 10px',
});
