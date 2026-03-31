import { MyChallengeApplied } from '@/components/MyChallenge/MyChallengeApplied';
import { fetchMyChallengesApplied } from '@/lib/api/myChallengeApi';


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

  const data = await fetchMyChallengesApplied({
    page: pageNum,
    limit: pageSizeNum,
    reviewStatus,
    keyword,
    sort,
  });

  const items = data.list;
  const totalCount = data.pagination.totalCount;

  return <MyChallengeApplied items={items} totalCount={totalCount} />;
}
