'use client';

import Image from 'next/image';
import search from '@public/img/btn/search.svg';
import { useEffect, useState } from 'react';
import * as styles from './SearchBar.css';

export default function SearchBar({ keyword, setKeyword, setPage }) {
  const [input, setInput] = useState(keyword);

  useEffect(() => {
    setInput(keyword);
  }, [keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = input.trim();

    setKeyword(trimmed);
    setPage(1);
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
