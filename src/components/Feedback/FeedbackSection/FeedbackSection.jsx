'use client';

import { useState } from 'react';
import FeedbackItem from '../FeedbackItem/feedbackItem';
import * as styles from './FeedbackSection.css';

export default function FeedbackSection({ submissionId, initialfeedbacks, initialNextCursor, currentUser }) {
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
    initialfeedbacks,
    initialNextCursor
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    createMutation.mutate(newFeedback, {
      onSuccess: () => setNewFeedback(''),
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          id="content"
          value={newFeedback}
          placeholder="피드백을 남겨주세요"
          onChange={(e) => setNewFeedback(e.target.value)}
          className={styles.feedbackContent}
        />
        <button type="submit"> 등록</button>
      </form>

      {feedbacks.length > 0 && (
        <div>
          {feedbacks.map((feedback) => (
            <FeedbackItem
              key={feedback.id}
              data={feedback}
              currentUser={currentUser}
              onUpdate={(data) =>
                updateMutation.mutate({
                  feedbackId: data.id,
                  content: data.content,
                })
              }
              onDelete={(id)=> 
                deleteMutation.mutate(id)
              }
            />
          ))}
        </div>
      )}

      {hasNextPage && (
        <button
          type="button"
          className={styles.nextButton}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? '불러오는 중...' : '더 보기'}
        </button>
      )}
    </div>
  );
}
