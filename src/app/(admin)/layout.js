import { Container } from '@/components/Common/Container';
import AdminHeader from '@/components/Header/Admin/AdminHearder';

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      <main style={{ paddingTop: '60px' }}>
        <Container bg="gray">{children}</Container>
      </main>
    </>
  );
}
