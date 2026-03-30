import { MyChallengeList } from '@/components/MyChallenge/MyChallengeList';
import { fetchMyChallengesCompleted } from '@/lib/api/myChallengeApi';
import { setAccessToken } from '@/lib/fetchClient';
import mockData from '@/mocks/my-completed-challenges.json';

export default async function completedPage({ searchParams }) {
  setAccessToken(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMUtNUFJXVE1FMEczS1pFSE02WTJOQUExRCIsIm5pY2tuYW1lIjoidXNlcjMwIiwidXNlclR5cGUiOiJVU0VSIiwiaWF0IjoxNzc0ODAzNTc3LCJleHAiOjE3NzQ4ODk5Nzd9.SOSQftr3evLoiBZha8pY0Z6sdUhNDkIfUCZnV8Lwt8Q',
  );

  const { page = '1', pageSize = '10', keyword = '' } = await searchParams;

  const data = await fetchMyChallengesCompleted({
    page: Number(page),
    limit: Number(pageSize),
    keyword,
  });

  return (
    <MyChallengeList
      initialData={data}
      queryKey="completedChallenges"
      type="completed"
    />
  );
}
