import * as styles from './apply.css.js';
import { ChallengeApplyForm } from '@/components/ChallengeApplyForm';

export default function ApplyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>신규 첼린지 신청</div>
      <ChallengeApplyForm btnName="신청하기" />
    </div>
  );
}
