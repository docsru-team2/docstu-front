import { TabMenu } from '@/components/MyChallenge/TabMenu';

export default function myChallengeLayout({ children }) {
  return (
    <div>
      <TabMenu />
      <div>{children}</div>
    </div>
  );
}
