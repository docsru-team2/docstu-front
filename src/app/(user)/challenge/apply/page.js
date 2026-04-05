'use client';

import { useRouter } from 'next/navigation';
import * as styles from './apply.css.js';
import { ChallengeApplyForm } from '@/components/ChallengeApplyForm';
import { createChallenge } from '@/lib/api/challengeApi';

export default function ApplyPage() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    await createChallenge({
      ...formData,
      maxParticipants: Number(formData.maxParticipants),
    });
    router.push('/challenge/list');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>신규 첼린지 신청</div>
      <ChallengeApplyForm btnName="신청하기" onSubmit={handleSubmit} />
    </div>
  );
}
