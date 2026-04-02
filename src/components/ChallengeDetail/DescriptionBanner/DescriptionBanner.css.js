import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  marginTop: '16px',
  marginBottom: '16px',
});

export const contentGroup = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '24px',
});

export const contentLeft = style({
  flex: 1,
});

export const titleBox = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const titleText = style({
  fontSize: vars.font.size['4xl'],
  fontWeight: vars.font.weight.semibold,
  marginBottom: '16px',
});

export const badgeWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
});

export const descriptionWrapper = style({
  marginTop: '16px',
  color: vars.color.gray700,
  wordBreak: 'break-word',
  lineHeight: vars.font.lineHeight.tight,
});

export const infoGroup = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '12px',
  marginTop: '16px',
});

export const infoItem = style({
  display: 'flex',
  gap: '4px',
  flexDirection: 'row',
  alignItems: 'center',
  color: vars.color.gray600,
});

export const underLine = style({
  borderTop: `1px solid ${vars.color.gray200}`,
  marginTop: '16px',
});

export const nickNameGroup = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: vars.font.size.xs,
  color: vars.color.brandDark,
  marginTop: '12px',
  gap: '8px',
});

export const badgeInner = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
});

export const topBadge = style({
  marginBottom: '12px',
});

export const iframeSectionTitle = style({
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.semibold,
  marginTop: '24px',
  marginBottom: '12px',
});

export const iframeWrapper = style({
  position: 'relative',
  width: '100%',
  height: '480px',
  borderRadius: '12px',
  overflow: 'hidden',
  border: `1px solid ${vars.color.gray100}`,
});

export const iframe = style({
  width: '100%',
  height: '100%',
  border: 'none',
});

export const iframeLoading = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.gray500,
  fontSize: vars.font.size.sm,
});

export const iframeOpenBtn = style({
  position: 'absolute',
  top: '12px',
  right: '12px',
  width: '120px',
});
