import { Pager } from '@/components/Common/Pager';
import * as styles from './ChallengeParticipantsList.css';

export default function ChallengeParticipantsList({ dataList }) {
  return (
    <div>
      <div>
        헤더
        <h2>참여현황</h2>
        <Pager />
      </div>

      <div className={styles.listWrapper}>
        {dataList.map((data, i) => (
          <div key={data.id} className={styles.item}>
            <div className={styles.rank}> {(i + 1).toString().padStart(2, '0')}</div>
            <div className={styles.user}>
              <div>아이콘</div> 
              <div>{data.author.nickname}</div>
              <div>{data.author.grage}</div>
            </div>
            <div> {data.author.likeCount}</div>
            <div>
            
              <link href={`/challenges/${data.id}` }>작업물보기 </link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
