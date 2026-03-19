import { Container } from '@/components/Common/Container';
import { UserHeader } from '@/components/Header/User';

export default function UserLayout({ children }) {
  return (
    <>
      <UserHeader />
      <Container bg="dark">{children}</Container>
    </>
  );
}
