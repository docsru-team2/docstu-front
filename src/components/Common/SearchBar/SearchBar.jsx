'use client';

import Image from 'next/image';
import search from '@public/img/btn/search.svg';
import { useEffect, useState } from 'react';
import * as styles from './SearchBar.css';

export default function SearchBar({ query, setQuery, setPage }) {
  const [keyword, setKeyword] = useState(query);

  useEffect(() => {
    setKeyword(query);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = keyword.trim();

    setQuery(trimmed);
    setPage(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="챌린지 이름을 검색해보세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Image src={search} alt="검색아이콘" className={styles.searchIcon} />
      </div>
    </form>
  );
}
