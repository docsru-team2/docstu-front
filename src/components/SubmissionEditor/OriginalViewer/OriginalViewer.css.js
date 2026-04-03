import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const floatingBtn = style({
  position: 'fixed',
  top: '136px',
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  padding: '24px 12px',
  backgroundColor: 'white',
  borderRadius: '24px 0 0 24px',
  border: `1px solid ${vars.color.gray200}`,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  zIndex: 100,
  transition: 'transform 0.2s',
  ':hover': {
    transform: 'scale(1.05)',
  },
});

export const floatingLabel = style({
  fontSize: vars.font.size.xs,
  color: vars.color.gray700,
  fontWeight: vars.font.weight.medium,
});

export const panel = style({
  position: 'fixed',
  top: 0,
  right: 0,
  width: '30vw ',
  height: '100vh',
  backgroundColor: '#1a1a1a',

  zIndex: 200,
  display: 'flex',
  flexDirection: 'column',
});

export const panelHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderBottom: '1px solid #333',
});

export const panelTitle = style({
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.semibold,
  color: 'white',
});

export const closeBtn = style({
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '18px',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '4px',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export const iframeWrapper = style({
  flex: 1,
  position: 'relative',
  overflow: 'hidden',
});

export const iframe = style({
  width: '100%',
  height: '100%',
  border: 'none',
});

export const openBtnWrapper = style({
  position: 'absolute',
  top: '12px',
  right: '12px',
  width: '110px',
});
