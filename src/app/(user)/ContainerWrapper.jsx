'use client';

import { usePathname } from 'next/navigation';
import { Container } from '@/components/Common/Container';

export default function ContainerWrapper({ children }) {
  const pathname = usePathname();
  const bg =
    pathname === '/challenge/apply' || pathname.startsWith('/translations')
      ? 'white'
      : 'gray';
  return <Container bg={bg}>{children}</Container>;
}
