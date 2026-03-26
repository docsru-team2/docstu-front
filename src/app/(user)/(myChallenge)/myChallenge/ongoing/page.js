import { MyChallengeList } from '@/components/MyChallenge/MyChallengeList';
import mockData from '@/mocks/admin-challenges.json';

export default function ongoingPage() {
  // const initialData = await fetchData({ pageParam: 1 });

  const initialData = mockData.data.list;
  // Api 연결하기
  return <MyChallengeList initialData={initialData} />;
}
