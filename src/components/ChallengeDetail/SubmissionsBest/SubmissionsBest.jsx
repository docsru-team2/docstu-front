'use client';

import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Image from 'next/image';
import * as styles from './SubmissionsBest.css.js';
import medal from '@public/img/medal.svg';
import user from '@public/img/header/user.svg';
import heart from '@public/img/heart.svg';
import arrowRight from '@public/img/arrowRight.svg';
import { formatLikeCount } from '@/utils/formatLikeCount';
import { formatDate } from '@/utils/dateUtils';

export default function SubmissionsBest({ submissions = [] }) {
  const sliderRef = useRef(null);

  if (submissions.length === 0) return null;

  const showCarousel = submissions.length > 1;

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: false,
  };

  const renderCard = (submission) => {
    const { nickname, grade } = submission.user;
    const likeCount = submission._count?.likes ?? 0;
    return (
      <div className={styles.container}>
        <div className={styles.titleBadge}>
          <Image src={medal} alt="메달" />
          최다 추천 번역
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userLeft}>
            <Image src={user} alt="사용자" />
            <span className={styles.nickname}>{nickname}</span>
            <span className={styles.grade}>
              {grade === 'NORMAL' ? '일반' : '전문가'}
            </span>
            <div className={styles.likeCount}>
              <Image src={heart} alt="추천" />
              {formatLikeCount(likeCount)}
            </div>
          </div>
          <span className={styles.date}>
            {formatDate(submission.createdAt, 'shortDatetime')}
          </span>
        </div>
        <div className={styles.underLine} />
        <div className={styles.content}>{submission.content}</div>
      </div>
    );
  };

  if (!showCarousel) {
    return (
      <div className={styles.wrapper}>
        {renderCard(submissions[0])}
      </div>
    );
  }

  return (
    <div className={styles.wrapperCarousel}>
      <div className={styles.sliderArea}>
        <Slider ref={sliderRef} {...settings}>
          {submissions.map((submission) => (
            <div key={submission.id}>
              {renderCard(submission)}
            </div>
          ))}
        </Slider>
        <button
          className={styles.carouselBtn}
          onClick={() => sliderRef.current?.slickNext()}
        >
          <Image src={arrowRight} alt="다음" className={styles.carouselArrow} />
        </button>
      </div>
    </div>
  );
}
