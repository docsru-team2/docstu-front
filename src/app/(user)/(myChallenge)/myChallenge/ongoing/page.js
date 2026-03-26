import { MyChallengeList } from '@/components/MyChallenge/MyChallengeList';
import mockData from '@/mocks/my-ongoing-challenges.json';

export default function ongoingPage() {
  // const initialData = await fetchData({ pageParam: 1 });

  const list = mockData.data.list
  const hasNext = mockData.data.pagination.hasNext
  // Api 연결하기
  return <MyChallengeList list={list} hasNext={hasNext} />;
}
