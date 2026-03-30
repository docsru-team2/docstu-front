import { MyChallengeApplied } from '@/components/MyChallenge/MyChallengeApplied';
import { fetchMyChallengesApplied } from '@/lib/api/myChallengeApi';
import { setAccessToken } from '@/lib/fetchClient';
import mockData from '@/mocks/my-applications.json';
import { cookies } from 'next/headers';
export default async function AppliedPage({ searchParams }) {
  const {
    page = '1',
    pageSize = '10',
    reviewStatus = '',
    sort = '',
    keyword = '',
  } = await searchParams;

  const pageNum = Number(page);
  const pageSizeNum = Number(pageSize);

  // const cookieStore = await cookies()
  // const token = cookieStore.get('accessToken')?.value;
  // if (token) {
  //   setAccessToken(token);
  // }

  setAccessToken(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMUtNUFJXVE1FMEczS1pFSE02WTJOQUExRCIsIm5pY2tuYW1lIjoidXNlcjMwIiwidXNlclR5cGUiOiJVU0VSIiwiaWF0IjoxNzc0ODAzNTc3LCJleHAiOjE3NzQ4ODk5Nzd9.SOSQftr3evLoiBZha8pY0Z6sdUhNDkIfUCZnV8Lwt8Q',
  );

  const data = await fetchMyChallengesApplied({
    page : pageNum,
    limit: pageSizeNum,
    reviewStatus,
    keyword,
    sort,
  });

  const items = data.list;
  const totalCount = data.pagination.totalCount;

  return <MyChallengeApplied items={items} totalCount={totalCount} />;
}
