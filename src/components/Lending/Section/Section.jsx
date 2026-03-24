import Image from 'next/image';
import cup from '@public/img/lending/lgCup.svg';
import heart from '@public/img/lending/lgLike.svg';
import feed from '@public/img/lending/lgFeed.svg';
import list from '@public/img/lending/lgList.png';
import challengeDetail from '@public/img/lending/lgChallenge.png';
import feedback from '@public/img/lending/lgFeedBack.png';
import * as styles from './Section.css.js';

export default function Section() {
  const sectionData = [
    {
      id: 1,
      icon: cup,
      iconAlt: 'cup',
      title: (
        <>
          혼자서는 막막했던 번역,
          <br />
          챌린지로 함께 완성하기
        </>
      ),
      description: (
        <>
          중요한 건 꺾이지 않는 마음! 동료들과 함께
          <br />
          기술 문서를 번역해 보세요.
        </>
      ),
      image: list,
      imageAlt: '챌린지 리스트 이미지',
    },
    {
      id: 2,
      icon: heart,
      iconAlt: 'heart',
      title: (
        <>
          내가 좋아하는 기술 번역,
          <br />
          내가 필요한 기술 번역
        </>
      ),
      description: (
        <>
          이미 진행 중인 번역 챌린지에 참여하거나
          <br />
          새로운 번역 챌린지를 시작해 보세요.
        </>
      ),
      image: challengeDetail,
      imageAlt: '챌린지 상세 이미지',
    },
    {
      id: 3,
      icon: feed,
      iconAlt: 'feed',
      title: '피드백으로 함께 성장하기',
      description: (
        <>
          번역 작업물에 대해 피드백을 주고 받으며
          <br />
          영어 실력은 물론, 개발 실력까지 키워 보세요.
        </>
      ),
      image: feedback,
      imageAlt: '피드백 이미지',
    },
  ];
  return (
    <div className={styles.sectionWrapper}>
      {sectionData.map((item, index) => (
        <section key={item.id}>
          <div className={styles.sectionItem}>
            <div className={styles.textBox}>
              <Image src={item.icon} alt={item.iconAlt} />
              <div className={styles.sectionTitle}>{item.title}</div>
              <div className={styles.sectionDes}>{item.description}</div>
            </div>
            <Image
              src={item.image}
              alt={item.imageAlt}
              className={styles.imgSize}
            />
          </div>

          {index !== sectionData.length - 1 && (
            <div className={styles.divider} />
          )}
        </section>
      ))}
    </div>
  );
}
