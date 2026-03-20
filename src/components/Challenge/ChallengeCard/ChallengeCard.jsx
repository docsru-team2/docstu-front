import { formatDate } from '@/utils/dateUtils';
import { Badge } from '../../Common/Badge';
import { FIELD_MAP, DOCUMENT_TYPE_MAP } from '@/constants/challengeConstants';

export default function ChallengeCard({ data }) {
  if (!data) return null;

  const {
    title,
    field,
    documentType,
    deadline,
    currentParticipants,
    maxParticipants,
  } = data;
  const fieldInfo = FIELD_MAP[field];
  const isClosedFull = currentParticipants >= maxParticipants;
  const isClosedExpired = new Date() > new Date(deadline);

  return (
    <div>
      {isClosedExpired ? (
        <Badge badgeStyle="closedStatus" color="closedExpired">
          <span>챌린지가 마감되었어요</span>
        </Badge>
      ) : isClosedFull ? (
        <Badge badgeStyle="closedStatus" color="closedFull">
          <span>모집이 완료된 상태에요</span>
        </Badge>
      ) : null}

      <h2>{title}</h2>
      <Badge badgeStyle="field" color={fieldInfo?.color}>
        {fieldInfo?.label}
      </Badge>
      <Badge badgeStyle="documentType">{DOCUMENT_TYPE_MAP[documentType]}</Badge>
      <div className="divider"></div>
      <span> {formatDate(deadline, 'ko')} 마감</span>
      <span>
        {data.currentParticipants}/ {data.maxParticipants}참여중
      </span>

      {/* 도전 계속하기 / 내 작업물 보기 버튼 추가 */}
    </div>
  );
}
