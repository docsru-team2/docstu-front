'use client';

import { ChallengeCard } from '@/components/Challenge/ChallengeCard';
import { SearchBar } from '@/components/Common/SearchBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import * as styles from './MyChallengeList.css'
import mockData from '@/mocks/challenges.json';
import Link from 'next/link';

export default function MyChallengeOngoing({ list, hasNext }) {
  
 
  return (
    <div>
      <div className={styles.searchBarContainer}>
      <SearchBar />
      </div>
      <div className={styles.cardList}>
        {list.map((challenge) => (
          <div key={challenge.id} className={styles.cardItem}>
            <Link href={`/challengeList/${challenge.id}`}>
            <ChallengeCard data={challenge} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
