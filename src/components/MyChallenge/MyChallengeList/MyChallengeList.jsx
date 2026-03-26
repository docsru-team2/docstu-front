'use client';

import { ChallengeCard } from '@/components/Challenge/ChallengeCard';
import { SearchBar } from '@/components/Common/SearchBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import * as styles from './MyChallengeList.css'

export default function MyChallengeOngoing({ initialData }) {
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
      <SearchBar />
      <div className={styles.cardList}>
        {initialData.map((item) => (
          <div key={item.id} className={styles.cardItem}>
            <ChallengeCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
