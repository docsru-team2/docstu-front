import { ChallengeTable } from '@/components/Challenge/ChallengeTable';
import { PaginationBar } from '@/components/Common/PaginationBar';
import { SearchBar } from '@/components/Common/SearchBar';

export default function ChallengeApplied({items, totalCount}) {
  return (
    <div>
      <SearchBar />
      {/* 드롭다운 */}
      <ChallengeTable dataList={items} getHref={(item) => `/myChallenge/applied/${item.id}`}/>
      <PaginationBar totalCount={totalCount}/>
    </div>
  );
}
