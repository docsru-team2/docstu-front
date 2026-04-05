'use client';
import * as styles from './Submission.css.js';
import Image from 'next/image';
import userProfile from '@public/img/header/user.svg';
import { useRouter } from 'next/navigation';
import { FIELD_MAP, DOCUMENT_TYPE_MAP } from '@/constants/challengeConstants';
import { Badge } from '@/components/Common/Badge';
import SubmissionLike from '@/components/SubmissionLike/SubmissionLike.jsx';
import SimpleDropdown from '@/components/Common/SimpleDropdown/SimpleDropdown';
import EmptyState from '@/components/Common/EmptyState/EmptyState.jsx';
import { api } from '@/lib/fetchClient';

export default function Submission({
  submissionData,
  isOwner,
  challengeData,
  userType,
  onDelete,
}) {
  const router = useRouter();

  const handleDelete = async () => {
    if (onDelete) {
      onDelete(submissionData);
      return;
    }
    if (isOwner) {
      await api.delete(`/submissions/${submissionData.id}`);
      router.push(`/challenge/detail/${submissionData.challengeId}?page=1`);
    }
  };

  const { id, createdAt, content, user, _count, title, challengeId } =
    submissionData;
  const { field, documentType } = challengeData;
  const fieldInfo = FIELD_MAP[field];
  const dateOnly = new Date(createdAt)
    .toISOString()
    .slice(2, 10)
    .replace(/-/g, '/');
  return (
    <div className={styles.container}>
      <nav>
        <div className={styles.top}>
          <h1>{title}</h1>
          {(isOwner || userType === 'ADMIN') && (
            <SimpleDropdown
              items={[
                {
                  key: 'edit',
                  label: '수정하기',
                  action: () => {
                    const basePath = isOwner
                      ? '/translations'
                      : '/admin/translations';
                    router.push(
                      `${basePath}/${challengeId}?submissionId=${id}`,
                    );
                  },
                },
                {
                  key: 'delete',
                  label: '삭제하기',
                  action: handleDelete,
                },
              ]}
            />
          )}
        </div>
        <div className={styles.tab}>
          <Badge badgeStyle="field" color={fieldInfo?.color}>
            {fieldInfo?.label}
          </Badge>
          <Badge badgeStyle="documentType">
            {DOCUMENT_TYPE_MAP[documentType]}
          </Badge>
        </div>
      </nav>

      <aside>
        <div className={styles.asideInfo}>
          <div className={styles.user}>
            <Image src={userProfile} alt="userProfile" />
            <span>{user.nickname}</span>
          </div>

          <SubmissionLike submissionId={id} likes={_count.likes} />
        </div>

        <span>{dateOnly}</span>
      </aside>

      <section className={styles.constentsWrapper}>
        {content !== '' ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <EmptyState text="아직 아무런 번역을 진행하지 않았어요!" />
        )}
      </section>
    </div>
  );
}
