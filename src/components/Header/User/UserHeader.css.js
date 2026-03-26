import { style } from '@vanilla-extract/css';
import { media, vars } from '@/styles/tokens.css';

export const wrapper = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  width: '100%',
  height: '60px',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: `1px solid ${vars.color.gray100}`,
});

export const inner = style({
  maxWidth: '1920px',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 360px',

  fontStyle: vars.font.size.lg,
  color: vars.color.gray800,
  '@media': {
    [media.belowIPadMini]: {
      padding: '0 24px',
    },
    [media.belowMobile]: {
      padding: '0 16px',
    },
  },
});

export const loginProfieGroup = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  gap: '16px',
});

export const btnWrapper = style({
  width: '90px',
});

export const logo = style({
  width: '80px', // 기본값 = 모바일
  height: 'auto',

  '@media': {
    [media.iPadMini]: {
      width: '120px', // 518px 이상 = 태블릿/데스크탑
    },
  },
});
