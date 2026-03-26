'use client';

import { ChallengeCard } from '@/components/Challenge/ChallengeCard';
import { SearchBar } from '@/components/Common/SearchBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import * as styles from './MyChallengeList.css'
import mockData from '@/mocks/challenges.json';
import Link from 'next/link';

export default function MyChallengeOngoing({ list, hasNext }) {
  // const observerRef = useRef(null);

  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status} =
  //   useInfiniteQuery({
  //     queryKey: ['mychallenge'],
  //     queryFn: fetchData,
  //     getNextPageParam: (lastPage, allPages) => {
  //       if (!lastPage.hasNext) return undefined;
  //       return allPages.length + 1
  //     },
  //     initialData: {
  //       pages: [initialData],
  //       pageParams: [1]
  //     }
  //   });

  // useEffect(() => {
  //   if (!observerRef.current) return;
  //   const observer = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting && hasNextPage) {
  //       fetchNextPage();
  //     }
  //   });
  //   observer.observe(observerRef.current);
  //   return () => observer.disconnect();
  // }, [hasNextPage, fetchNextPage]);

  // if (status === 'pending') return <p>로딩중...</p>;
  // if (status === 'error') return <p>에러 발생</p>;
 
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
