import { UserHeader } from '@/components/Header/User';
import AdminHeader from '@/components/Header/Admin/AdminHearder';
import ContainerWrapper from './ContainerWrapper';
import { cookies } from 'next/headers';

export default async function UserLayout({ children }) {
  const cookieStore = await cookies();
  const userType = cookieStore.get('userType')?.value;

  return (
    <>
      {userType === 'ADMIN' ? <AdminHeader /> : <UserHeader />}
      <main style={{ paddingTop: '60px' }}>
        <ContainerWrapper>{children}</ContainerWrapper>
      </main>
    </>
  );
}
