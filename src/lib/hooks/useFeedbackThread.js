'use client';

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createSubmissionFeedback,
  fetchSubmissionFeedbackList,
  removeFeedback,
  updateFeedback,
} from '../api/feedbackApi';

export function useFeedbackThread({
  submissionId,
  initialFeedbacks = [],
  initialNextCursor = null,
}) {
  const queryClient = useQueryClient();

  // 피드백 리스트
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['feedbacks', submissionId],
      queryFn: ({ pageParam = 1 }) =>
        fetchSubmissionFeedbackList({
          submissionId,
          limit: 3,
          page: pageParam,
        }),
      initialData: initialFeedbacks.length
        ? {
            pages: [
              {
                list: initialFeedbacks,
                pagination: { hasNext: !!initialNextCursor },
              },
            ],
            pageParams: [1],
          }
        : undefined,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        return lastPage?.pagination?.hasNext ? allPages.length + 1 : undefined;
      },
    });

  const feedbacks = data?.pages.flatMap((page) => page.list) ?? [];

  // 피드백 작성
  const createMutation = useMutation({
    mutationFn: (content) =>
      createSubmissionFeedback({ submissionId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks', submissionId] });
    },
  });

  // 피드백 수정
  const updateMutation = useMutation({
    mutationFn: ({ feedbackId, content }) =>
      updateFeedback(feedbackId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks', submissionId] });
    },
  });
  // 피드백 삭제
  const deleteMutation = useMutation({
    mutationFn: (feedbackId) => removeFeedback(feedbackId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks', submissionId] });
    },
  });

  return {
    feedbacks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
