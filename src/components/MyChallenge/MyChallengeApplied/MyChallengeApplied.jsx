import { ChallengeTable } from '@/components/Challenge/ChallengeTable';
import { PaginationBar } from '@/components/Common/PaginationBar';
import { SearchBar } from '@/components/Common/SearchBar';

export default function MyChallengeApplied() {
  return (
    <div>
      <SearchBar />
      {/* 드롭다운 */}
      <ChallengeTable />
      <PaginationBar />
    </div>
  );
}
