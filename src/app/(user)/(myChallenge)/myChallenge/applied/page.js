import ChallengeApplied from '@/components/Challenge/ChallengeApplied/ChallengeApplied';
import mockData from '@/mocks/my-applications.json';
export default function appliedPage({ searchParams }) {
  //api 연결
  //const page = Number(searchParams.page) || 1;
  //const pageSize = Number(searchParams.pageSize) || 10;
  //const sort = searchParams.sort || 'CREATED_DESC';
  //const reviewStatus = searchParams.reviewStatus || '';
  //const data = await ...

  const page = Number(searchParams.page) || 1;
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pagedItems = mockData.data.items.slice(start, end);
  const totalcount = mockData.data.pagination.totalCount;

  return <ChallengeApplied items={pagedItems} totalCount={totalcount} />;
}
