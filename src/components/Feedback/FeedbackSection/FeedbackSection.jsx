'use client';

import { useState } from 'react';
import * as styles from './FeedbackSection.css';
import { useFeedbackThread } from '@/lib/hooks/useFeedbackThread';
import { FeedbackItem } from '../FeedbackItem';

export default function FeedbackSection({
  submissionId,
  initialFeedbacks,
  initialNextCursor,
  currentUser,
}) {
  const [newFeedback, setNewFeedback] = useState('');
  const {
    feedbacks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useFeedbackThread({
    submissionId,
    initialFeedbacks,
    initialNextCursor,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;
    createMutation.mutate(newFeedback, {
      onSuccess: () => setNewFeedback(''),
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <textarea
          id="content"
          value={newFeedback}
          placeholder="피드백을 남겨주세요"
          onChange={(e) => setNewFeedback(e.target.value)}
          className={styles.feedbackContent}
        />
        <button className={styles.submitButton} type="submit"> 등록</button>
      </form>

      {feedbacks.length > 0 && (
        <div className={styles.feedbackList}>
          {feedbacks.map((feedback, index) => (
            <FeedbackItem
              key={feedback.id ?? index}
              data={feedback}
              currentUser={currentUser}
              onUpdate={(e) =>
                updateMutation.mutate({ feedbackId: e.id, content: e.content })
              }
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          ))}
        </div>
      )}

      {hasNextPage && (
        <div className={styles.buttonWrapper}>
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={styles.nextButton}
        >
          {isFetchingNextPage ? '불러오는 중...' : '더 보기'}
        </button>
        </div>
      )}
    </div>
  );
}
