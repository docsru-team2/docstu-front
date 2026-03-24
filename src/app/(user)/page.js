import { Button } from '@/components/Common/Button';
import { Hero } from '@/components/Lending/Hero';
import { Section } from '@/components/Lending/Section';
import * as styles from './page.css.js';

export default function Rending() {
  return (
    <>
      <Hero />
      <Section />
      <div className={styles.bottomGroup}>
        <div className={styles.bttomText}>함께 번역하고 성장하세요!</div>
        <div className={styles.btnWrapper}>
          <Button size="lg" href="/login">
            번역 시작하기
          </Button>
        </div>
      </div>
    </>
  );
}
