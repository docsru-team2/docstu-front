import Button from '@/components/Common/Button/Button.jsx';
import * as styles from './challengelist.css.js';
import pluse from '@public/img/btn/plus.svg';
import FilterDropdown from '@/components/Common/FilterDropdown/FilterDropdown.jsx';
import SearchBar from '@/components/Common/SearchBar/SearchBar.jsx';
import ChallengeCard from '@/components/Challenge/ChallengeCard/ChallengeCard.jsx';
import mockData from '@/mocks/challenge-list.json';
import { Pager } from '@/components/Common/Pager/index.js';
import PaginationBar from '@/components/Common/PaginationBar/PaginationBar.jsx';

export default function ChallengeList() {
  const challenges = mockData.data.list;
  console.log(challenges);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        <div className={styles.titleText}>첼린지 목록</div>
        <div className={styles.btnGroup}>
          <Button size="md" roundBtn hasIcon={pluse}>
            신규 챌린지 신청
          </Button>
        </div>
      </div>
      <div className={styles.filterGroup}>
        <FilterDropdown />
        <SearchBar keyword={''} />
      </div>
      <div className={styles.cardWrapper}>
        {challenges.map((item) => (
          <div key={item.id} className={styles.cardItem}>
            <ChallengeCard data={item} />
          </div>
        ))}
      </div>
      <PaginationBar totalPages={10} page={1} setPage={10} />
    </div>
  );
}
