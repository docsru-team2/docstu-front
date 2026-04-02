'use client';

import { useQueryClient } from '@tanstack/react-query';
import { deleteFeedback } from '../api/adminChallengeApi';

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
          limit: 10,
          page: pageParam,
        }),
      initialData: initialFeedbacks.length
        ? {
            pages: [initialFeedbacks],
            pageParams: [1],
          }
        : undefined,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        return lastPage.pagination.hasNext ? allPages.length + 1 : undefined;
      },
    });

  const feedback = data?.pages.flatMap((page) => page) ?? [];

  // 피드백 작성
  const createMutation = useMutation({
    mutationFn: (content) =>
      createSubmissionFeedback({ submissionId, content }),
    onSuccess: (newFeedback) => {
      queryClient.setQueryData(['feedbacks', submissionId], (oldData) => ({
        ...oldData,
        pages: [[newFeedback, ...oldData.pages[0]], ...oldData.pages.slice(1)],
      }));
    },
  });

  // 피드백 수정
  const updateMutation = useMutation({
    mutationFn: ({ feedbackId, content }) =>
      updateFeedback({ feedbackId, content }),
    onSuccess: (updatedFeedback) => {
      queryClient.setQueryData(['feedbacks', submissionId], (oldData) => ({
        ...oldData,
        pages: oldData.pages.map((page) =>
          page.map((fb) =>
            fb.id === updatedFeedback.id ? updatedFeedback : fb,
          ),
        ),
      }));
    },
  });
  // 피드백 삭제
  const deleteMutation = useMutation({
    mutationFn: (feedbackId) => deleteFeedback(feedbackId),
    onSuccess: (_, feedbackId) => {
      queryClient.setQueryData(['feedbacks', submissionId], (oldData) => ({
        ...oldData,
        pages: oldData.pages.map((page) =>
          page.filter((fb) => fb.id !== feedbackId),
        ),
      }));
    },
  });

  return {
    feedback,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
