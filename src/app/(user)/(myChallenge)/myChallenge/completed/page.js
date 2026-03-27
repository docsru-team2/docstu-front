import { MyChallengeList } from '@/components/MyChallenge/MyChallengeList';
import mockData from '@/mocks/my-completed-challenges.json';

export default function completedPage({searchParams}) {

  //목데이터연결
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pagedList = mockData.data.list.slice(start, end);
  const hasNext = mockData.data.pagination.hasNext;
  // Api 연결하기
  return <MyChallengeList list={pagedList} hasNext={hasNext} />;
}
