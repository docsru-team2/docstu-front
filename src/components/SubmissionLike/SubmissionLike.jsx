'use client';

import { useEffect, useState } from 'react';
import * as styles from './SubmissionLike.css.js';
import Image from 'next/image';
import heart from '@public/img/heart.svg';
import fillHeart from '@public/img/fillHeart.svg';
import {
  likeCheck,
  submissionsLike,
  submissionsLikeDelete,
} from '@/lib/api/submissionApi';

export default function SubmissionLike({ submissionId, likes }) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(Number(likes));

  useEffect(() => {
    const fetchLike = async () => {
      const check = await likeCheck(submissionId);
      setLike(check.data.isLiked);
    };
    fetchLike();
  }, [submissionId]);

  const handleAddLike = async () => {
    await submissionsLike(submissionId);
    setLikeCount((prev) => prev + 1);
    setLike(true);
  };

  const handleDeleteLike = async () => {
    await submissionsLikeDelete(submissionId);
    setLikeCount((prev) => prev - 1);
    setLike(false);
  };

  return (
    <div className={styles.like}>
      {!like ? (
        <button onClick={handleAddLike}>
          <Image src={heart} alt="heart" />
        </button>
      ) : (
        <button onClick={handleDeleteLike}>
          <Image src={fillHeart} alt="fillHeart" />
        </button>
      )}

      <span>{likeCount}</span>
    </div>
  );
}
