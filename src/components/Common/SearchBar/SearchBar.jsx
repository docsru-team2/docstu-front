'use client';

import Image from 'next/image';
import search from '@public/img/btn/search.svg';
import { useState } from 'react';
import * as styles from './SearchBar.css';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [input, setInput] = useState(searchParams.get('keyword') ?? '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const trimmed = input.trim();

    if (trimmed) {
      params.set('keyword', trimmed);
    } else {
      params.delete('keyword');
    }

    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="챌린지 이름을 검색해보세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Image src={search} alt="검색아이콘" className={styles.searchIcon} />
      </div>
    </form>
  );
}
