import * as styles from './Hero.css.js';
import heroBanner from '@public/img/lending/lendingBanner.png';
import logo from '@public/img/logo/bannerLogo.svg';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className={styles.heroWrapper}>
      <Image
        src={heroBanner}
        alt="heroBanner"
        fill
        style={{ objectFit: 'cover' }}
      />
      <div className={styles.content}>
        <Image src={logo} alt="logo" />
        <div className={styles.textStyle}>
          함께 번역하며 성장하는 <br /> 개발자의 새로운 영어 습관
        </div>
      </div>
      {/** 버튼 컴포넌트 나오면 작업 */}
      <div>번역시작하기</div>
    </div>
  );
}
