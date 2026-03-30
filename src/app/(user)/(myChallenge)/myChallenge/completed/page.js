import { MyChallengeList } from '@/components/MyChallenge/MyChallengeList';
import { fetchMyChallengesCompleted } from '@/lib/api/myChallengeApi';

export default async function completedPage({ searchParams }) {
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
