import ChallengeApplied from '@/components/MyChallenge/ChallengeApplied/ChallengeApplied';
import mockData from '@/mocks/my-applications.json';
export default function appliedPage({ searchParams }) {

  const items = mockData.data.items;
  const totalcount = mockData.data.pagination.totalCount;
  // Api 연결하기

  return (
    <ChallengeApplied
      items={items}
      totalCount={totalcount}
    />
  );
}
