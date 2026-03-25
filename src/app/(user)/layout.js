import { UserHeader } from '@/components/Header/User';
import ContainerWrapper from './ContainerWrapper';

export default function UserLayout({ children }) {
  return (
    <>
      <UserHeader />
      <main>
        <ContainerWrapper>{children}</ContainerWrapper>
      </main>
    </>
  );
}
