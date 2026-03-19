import localFont from 'next/font/local';
import clsx from 'clsx';
import { QueryProvider } from '@/providers';
import { themeClass } from '@/styles/tokens.css.js';
import '@/styles/reset.css.js';
import '@/styles/globals.css.js';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
});

export const metadata = {
  title: 'Docthru',
  description: 'codit Docthru project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={clsx(pretendard.variable, themeClass)}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
