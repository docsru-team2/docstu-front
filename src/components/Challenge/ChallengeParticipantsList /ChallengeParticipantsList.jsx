import { Pager } from '@/components/Common/Pager';
import * as styles from './ChallengeParticipantsList.css';
import Image from 'next/image';
import crown from '@public/img/crown.svg';
import user from '@public/img/header/user.svg';
import fillHeart from '@public/img/fillHeart.svg';
import arrowRight from '@public/img/arrow/arrowRightActive.svg';
import Link from 'next/link';
import { formatLikeCount } from '@/utils/formatLikeCount';

export default function ChallengeParticipantsList({ dataList, totalCount }) {
  return (
    <div className={styles.listContainer}>
      <div className={styles.listHeader}>
        <p>참여현황</p>
        {totalCount > 5 && <Pager totalCount={totalCount} />}
      </div>
      {dataList.length === 0 ? (
        <p className={styles.emptyText}>
          아직 참여한 도전자가 없어요,<br /> 지금 바로 도전해보세요!
        </p>
      ) : (
        <div className={styles.list}>
          {dataList.map((data, i) => {
            const { nickname, grade } = data.user;
            const likeCount = data._count?.likes ?? 0;
            return (
              <div key={data.id} className={styles.item}>
                <div className={styles.leftWrapper}>
                  <div className={styles.rank}>
                    {i === 0 && <Image src={crown} alt="왕관아이콘" />}
                    {(i + 1).toString().padStart(2, '0')}
                  </div>
                  <div className={styles.userWrapper}>
                    <div>
                      <Image src={user} alt="사용자아이콘" />{' '}
                    </div>
                    <div className={styles.user}>
                      <div>{nickname}</div>
                      <div className={styles.gradeFont}>
                        {grade === 'NORMAL' ? '일반' : '전문가'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.rightWrapper}>
                  <div className={styles.likeCount}>
                    <Image src={fillHeart} alt="추천아이콘" />
                    {formatLikeCount(likeCount)}
                  </div>
                  <div>
                    <Link
                      href={`/challenges/${data.id}`}
                      className={styles.link}
                    >
                      작업물보기{' '}
                      <Image
                        src={arrowRight}
                        alt="작업물보기"
                        className={styles.arrowSize}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
