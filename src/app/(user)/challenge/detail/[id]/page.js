import { challengeDetail } from '@/lib/api/challengeApi';
import { getMe } from '@/lib/api/userApi';

export default async function ChallengeDetailPage({ params }) {
  const { id } = await params;
  const [challengeData, me] = await Promise.all([challengeDetail(id), getMe()]);
  const isOwner = challengeData.creatorId === me.id;
  console.log(challengeData);
  console.log(me);
  console.log(isOwner);
  return <div>디테일 페이지{isOwner && '내꺼'}</div>;
}
