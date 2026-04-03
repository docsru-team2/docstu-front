import { vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';


  export const container = style({
  width: '100%',
  maxWidth: '890px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
})

export const formContainer = style({
  position: 'relative',
});

export const feedbackContent = style({
  display: 'inline-flex',
  width: '100%',
  alignItems: 'flex-start',
  resize: 'none',
  outline: 'none',
  padding: '16px',
  height: '89px',
  borderRadius: '12px',
  border: `1px solid ${vars.color.gray200}`,
  backgroundColor: vars.color.white,
  color: vars.color.gray700,
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.medium,
  selectors: {
    '&:focus': {
      outline: 'none',
    },
    '&::placeholder': {
      color: vars.color.gray400,
    },
  },
});

export const feedbackList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

export const submitButton = style({
  position: 'absolute',
  bottom: '16px',
  right: '16px',
  zIndex: 10,
  color: vars.color.gray500
});

export const nextButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '180px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: vars.color.gray100,
  color: vars.color.gray500,
  textAlign: 'center',
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.medium,
});


export const buttonWrapper = style({
  marginTop: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
})