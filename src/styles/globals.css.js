import { globalStyle } from '@vanilla-extract/css';

globalStyle('html', {
  margin: 0,
  padding: 0,
  fontFamily: 'var(--font-pretendard), sans-serif',
});

globalStyle('body', {
  margin: 0,
  padding: 0,
  fontFamily: 'var(--font-pretendard), sans-serif',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
});

globalStyle('*', {
  boxSizing: 'border-box',
});
