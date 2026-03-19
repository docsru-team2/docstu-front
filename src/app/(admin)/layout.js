import { Container } from '@/components/Common/Container';
import AdminHeader from '@/components/Header/Admin/AdminHearder';

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      <Container bg="gray">{children}</Container>
    </>
  );
}
