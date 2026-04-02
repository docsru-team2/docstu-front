import * as styles from './detail.css.js';
import ChallengeDetailContent from '@/components/ChallengeDetail/ChallengeDetailContent/ChallengeDetailContent.jsx';

export default async function ChallengeDetailPage({ params, searchParams }) {
  const { id } = await params;
  const { page = '1' } = await searchParams;

  return (
    <div className={styles.container}>
      <ChallengeDetailContent id={id} page={page} />
    </div>
  );
}
