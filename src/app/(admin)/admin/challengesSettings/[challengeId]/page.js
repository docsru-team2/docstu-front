import { fetchAdminChallengeDetail } from '@/lib/api/adminChallengeApi.js';
import ChallengeDetailContent from '@/components/ChallengeDetail/ChallengeDetailContent/ChallengeDetailContent.jsx';
import AdminActions from './AdminActions.jsx';
import Image from 'next/image';
import arrowLeftActive from '@public/img/arrow/arrowLeftActive.svg';
import arrowLeftInactive from '@public/img/arrow/arrowLeftInactive.svg';
import arrowRightActive from '@public/img/arrow/arrowRightActive.svg';
import arrowRightInactive from '@public/img/arrow/arrowRightInactive.svg';

import * as styles from './page.css.js';

export default async function AdminChallengeDetailPage({ params }) {
  const { challengeId } = await params;

  // 어드민 API로 네비게이션 + reviewStatus 데이터 조회
  const challenge = await fetchAdminChallengeDetail(challengeId);
  const { reviewStatus, navigation } = challenge;

  return (
    <div className={styles.container}>
      {/* No. + 네비게이션 */}
      <div className={styles.navigationBar}>
        <span className={styles.challengeNo}>No. {challenge.id}</span>
        <div className={styles.navButtons}>
          <a
            className={styles.navButton}
            href={navigation?.prevId ? `/admin/challengesSettings/${navigation.prevId}` : undefined}
          >
            <Image
              src={navigation?.prevId ? arrowLeftActive : arrowLeftInactive}
              alt="이전"
            />
          </a>
          <a
            className={styles.navButton}
            href={navigation?.nextId ? `/admin/challengesSettings/${navigation.nextId}` : undefined}
          >
            <Image
              src={navigation?.nextId ? arrowRightActive : arrowRightInactive}
              alt="다음"
            />
          </a>
        </div>
      </div>

      {/* 챌린지 정보 */}
      <ChallengeDetailContent id={challengeId} page="1" />

      {/* PENDING일 때만 승인/거절 버튼 */}
      {reviewStatus === 'PENDING' && (
        <AdminActions challengeId={challengeId} />
      )}
    </div>
  );
}