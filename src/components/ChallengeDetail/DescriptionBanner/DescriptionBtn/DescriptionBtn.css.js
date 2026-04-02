import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '284px',
  alignSelf: 'flex-start',
  backgroundColor: 'white',
  border: `1px solid ${vars.color.gray100}`,
  borderRadius: '16px',
  padding: '24px 16px',
});
export const infoGroup = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4px',
  width: '100%',
  justifyContent: 'center',
  marginBottom: '16px',
});
export const infoItem = style({
  display: 'flex',
  gap: '4px',
  flexDirection: 'row',
  alignItems: 'center',
  color: vars.color.gray600,
  fontSize: vars.font.size.xs,
});

export const btn = style({
  width: '100%',
});

export const btnWithMargin = style({
  width: '100%',
  marginBottom: '8px',
});

