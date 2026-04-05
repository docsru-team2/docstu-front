import { vars } from '@/styles/tokens.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  height: 'calc(100vh - 88px)',
  display: 'flex',
  flexDirection: 'column',
});

export const titleInput = style({
  width: '100%',
  padding: '0 0 24px 0',
  border: 'none',
  borderBottom: `1px solid ${vars.color.gray200}`,
  fontSize: vars.font.size['2xl'],
  fontWeight: vars.font.weight.semibold,
  outline: 'none',
});

export const textEditorHeader = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '24px 0',
  width: '100%',
  gap: '16px',
});

export const textEditorItemBox = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const toolbarBtn = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    backgroundColor: vars.color.gray100,
  },
});

export const colorPickerWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const colorPicker = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  marginTop: '8px',
  padding: '8px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '6px',
  zIndex: 10,
});

export const colorSwatch = style({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  border: `1px solid ${vars.color.gray200}`,
  cursor: 'pointer',
  ':hover': {
    transform: 'scale(1.2)',
  },
});

export const draftBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  backgroundColor: vars.color.gray50,
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: '8px',
  marginBottom: '16px',
});

export const draftBarLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: vars.font.size.md,
  color: vars.color.gray600,
});

export const draftCloseBtn = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
});

export const editorArea = style({
  width: '100%',
  flex: 1,
  overflowY: 'auto',
  //   padding: '16px',
  fontSize: vars.font.size.md,
  lineHeight: '1.6',
  outline: 'none',
  selectors: {
    '&:empty::before': {
      content: 'attr(data-placeholder)',
      color: vars.color.gray400,
    },
  },
});

globalStyle(`${editorArea} ul`, {
  listStyleType: 'disc',
  paddingLeft: '24px',
});

globalStyle(`${editorArea} ol`, {
  listStyleType: 'decimal',
  paddingLeft: '24px',
});
