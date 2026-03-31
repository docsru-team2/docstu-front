'use client';

import { ChallengeCard } from '@/components/Challenge/ChallengeCard';
import { SearchBar } from '@/components/Common/SearchBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import * as styles from './MyChallengeList.css';
import {
  fetchMyChallengesCompleted,
  fetchMyChallengesOngoing,
} from '@/lib/api/myChallengeApi';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MyChallengeList({ initialData, queryKey, type }) {
  const searchParams = useSearchParams();
  // const router = useRouter();
  const observerRef = useRef(null);

  const keyword = searchParams.get('keyword') || '';

  const fetchFunction =
    type === 'ongoing' ? fetchMyChallengesOngoing : fetchMyChallengesCompleted;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [queryKey, keyword],
      queryFn: ({ pageParam = 1 }) =>
        fetchFunction({
          page: pageParam,
          limit: 10,
          keyword,
        }),
      initialData: initialData
        ? {
            pages: [initialData],
            pageParams: [1],
          }
        : undefined,

      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        return lastPage.pagination.hasNext ? allPages.length + 1 : undefined;
      },
    });

  const allItems = data?.pages.flatMap((page) => page.list) || [];

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div>
      <div className={styles.searchBarContainer}>
        <SearchBar />
      </div>
      <div className={styles.cardList}>
        {allItems.map((challenge) => (
          <div key={challenge.id}>
            <ChallengeCard data={challenge} />
          </div>
        ))}
      </div>
      <div ref={observerRef} className={styles.observerTrigger} />

      {isFetchingNextPage && <p>Loading...</p>}
    </div>
  );
}
