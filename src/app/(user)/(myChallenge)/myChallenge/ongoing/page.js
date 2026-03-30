import { MyChallengeList } from '@/components/MyChallenge/MyChallengeList';
import { fetchMyChallengesOngoing } from '@/lib/api/myChallengeApi';
import { setAccessToken } from '@/lib/fetchClient';

export default async function ongoingPage({ searchParams }) {
  setAccessToken(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMUtNUFJXVE1FMEczS1pFSE02WTJOQUExRCIsIm5pY2tuYW1lIjoidXNlcjMwIiwidXNlclR5cGUiOiJVU0VSIiwiaWF0IjoxNzc0ODMyNjYyLCJleHAiOjE3NzQ5MTkwNjJ9.w7MTsH4reU3L5C8MS3sO0og1kjkuyxpCICpRMSB4BSo',
  );

  const { page = '1', pageSize = '10', keyword = '' } = await searchParams;

  const data = await fetchMyChallengesOngoing({
    page: Number(page),
    limit: Number(pageSize),
    keyword,
  });

  // Api 연결하기
  return (
    <MyChallengeList
      initialData={data}
      type="ongoing"
      queryKey="ongoingChallenges"
    />
  );
}
