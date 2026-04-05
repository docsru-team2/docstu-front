import { style } from '@vanilla-extract/css';
import { media, vars } from '@/styles/tokens.css';

export const wrapper = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  width: '100%',
  padding: '24px 0',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const inner = style({
  maxWidth: '996px',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  fontStyle: vars.font.size.lg,
  color: vars.color.gray800,
  //   '@media': {
  //     [media.belowIPadMini]: {
  //       padding: '0 24px',
  //     },
  //     [media.belowMobile]: {
  //       padding: '0 16px',
  //     },
  //   },
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
  height: 'auto',

  //   '@media': {
  //     [media.iPadMini]: {
  //       width: '120px', // 518px 이상 = 태블릿/데스크탑
  //     },
  //   },
});

export const FrameBtn = style({
  width: '80px',
});
export const submitBtn = style({
  width: '90px',
});
export const btnGroup = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});
