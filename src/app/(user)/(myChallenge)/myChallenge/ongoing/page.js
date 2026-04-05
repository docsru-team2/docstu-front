import { MyChallengeList } from '@/components/MyChallenge/MyChallengeList';
import { fetchMyChallengesOngoing } from '@/lib/api/myChallengeApi';

export default async function ongoingPage({ searchParams }) {
  const { page = '1', pageSize = '10', keyword = '' } = await searchParams;

  const data = await fetchMyChallengesOngoing({
    page: Number(page),
    limit: Number(pageSize),
    keyword,
  });

  return (
    <MyChallengeList
      initialData={data}
      type="ongoing"
      queryKey="ongoingChallenges"
    />
  );
}
