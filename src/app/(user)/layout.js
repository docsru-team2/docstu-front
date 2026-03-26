import { UserHeader } from '@/components/Header/User';
import ContainerWrapper from './ContainerWrapper';

export default function UserLayout({ children }) {
  return (
    <>
      <UserHeader />
      <main style={{ paddingTop: '60px' }}>
        <ContainerWrapper>{children}</ContainerWrapper>
      </main>
    </>
  );
}
