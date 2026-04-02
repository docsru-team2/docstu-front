import { vars } from '@/styles/tokens.css';
import { style, globalStyle } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',
  marginTop: '16px',
  marginBottom: '24px',
  width: '100%',
});

export const wrapperCarousel = style({
  position: 'relative',
  marginTop: '16px',
  marginBottom: '24px',
  width: '100%',
  overflow: 'hidden',
});

export const sliderArea = style({
  position: 'relative',
  width: 'calc(100% - 60px)',
  overflow: 'visible',
});

export const container = style({
  position: 'relative',
  padding: '24px',
  borderRadius: '16px',
  border: `2px solid ${vars.color.gray100}`,
  backgroundColor: vars.color.gray50,
  height: '324px',
  overflow: 'hidden',
});

export const titleBadge = style({
  display: 'inline-flex',
  position: 'absolute',
  top: 0,
  left: 0,
  alignItems: 'center',
  gap: '6px',
  padding: '8px 16px',
  borderRadius: '16px 0 16px 0',
  backgroundColor: vars.color.gray800,
  color: vars.color.white,
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.semibold,
});

export const userInfo = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '24px',
});

export const userLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const nickname = style({
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.medium,
});

export const grade = style({
  fontSize: vars.font.size.xs,
  color: vars.color.gray500,
});

export const likeCount = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: vars.font.size.md,
  color: vars.color.gray600,
});

export const date = style({
  fontSize: vars.font.size.xs,
  color: vars.color.gray500,
});

export const content = style({
  fontSize: vars.font.size.md,
  lineHeight: vars.font.lineHeight.tight,
  color: vars.color.gray800,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 10,
  WebkitBoxOrient: 'vertical',
});

export const moreBtn = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  marginTop: '16px',
  width: '100%',
  padding: '8px 0',
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.medium,
  color: vars.color.gray600,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
});

export const carouselBtn = style({
  position: 'absolute',
  right: '3px',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  zIndex: 2,
});

export const carouselArrow = style({
  width: '24px',
  height: '24px',
});

export const underLine = style({
  width: '100%',
  borderTop: `1px solid ${vars.color.gray200}`,
  margin: '16px 0',
});

// 슬라이드 간 간격
globalStyle(`${sliderArea} .slick-slide > div`, {
  paddingRight: '16px',
});

// 다음 카드 살짝 보이게
globalStyle(`${sliderArea} .slick-list`, {
  overflow: 'visible',
});

// 비활성 슬라이드 투명
globalStyle(`${sliderArea} .slick-slide:not(.slick-current) ${container}`, {
  opacity: 0.5,
});
