'use client';

import { usePathname } from 'next/navigation';
import { Container } from '@/components/Common/Container';

export default function ContainerWrapper({ children }) {
  const pathname = usePathname();
  const bg =
    pathname === '/challenge/apply' || pathname.startsWith('/translations')
      ? 'white'
      : 'gray';
  const whitePaths = ['/challenge/apply'];
  const whitePrefixes = ['/challenge/submission/detail/'];

  const bg = (
    whitePaths.includes(pathname) ||
    whitePrefixes.some(prefix => pathname.startsWith(prefix))
  ) ? 'white' : 'gray';

  return <Container bg={bg}>{children}</Container>;
}
