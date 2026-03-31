'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { api, BASE_URL } from '@/lib/fetchClient';

export function useNotification() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const closeSuccessModal = useCallback(() => {
    setSuccessMessage(null);
  }, []);

  // 스크롤 시 추가 로드
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingRef.current || !nextCursor) return;
    isLoadingRef.current = true;
    setIsLoading(true);

    const data = await api.get(`/notifications?cursor=${nextCursor}`);

    setNotifications((prev) => [...prev, ...data.notifications]);
    setNextCursor(data.nextCursor);
    setHasMore(data.hasMore);
    isLoadingRef.current = false;
    setIsLoading(false);
  }, [hasMore, nextCursor]);

  // 알림 목록 로드
  useEffect(() => {
    const init = async () => {
      const data = await api.get('/notifications');
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
      setNextCursor(data.nextCursor);
      setHasMore(data.hasMore);
    };

    init();
  }, []);

  // SSE 연결 (Next.js 프록시 우회 - 프록시가 스트리밍을 버퍼링하기 때문에 직접 연결)
  useEffect(() => {
    const SSE_URL =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    const es = new EventSource(SSE_URL + '/notifications/stream', {
      withCredentials: true,
    });

    es.onmessage = (e) => {
      const notification = JSON.parse(e.data);
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    es.onerror = () => {
      console.error('[SSE] 연결 오류');
    };

    return () => es.close(); // 언마운트 시 연결 종료
  }, []);

  // 단건 읽음 처리
  const markAsRead = useCallback(async (id) => {
    await api.patch(`/notifications/${id}`);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
    setSuccessMessage('읽음 처리되었습니다.');
  }, []);

  // 전체 읽음 처리
  const markAllAsRead = useCallback(async () => {
    await api.patch('/notifications/read-all');
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
    setSuccessMessage('모든 알림을 읽음 처리했습니다.');
  }, []);

  // 단건 삭제 처리
  const markDelete = useCallback(async (id) => {
    await api.delete(`/notifications/${id}`);

    setNotifications((prev) => {
      const target = prev.find((n) => n.id === id);
      if (target && !target.isRead) {
        setUnreadCount((c) => Math.max(0, c - 1));
      }
      return prev.filter((n) => n.id !== id);
    });
    setSuccessMessage('알림이 삭제되었습니다.');
  }, []);

  // 전체 삭제 처리
  const markAllDelete = useCallback(async () => {
    await api.delete('/notifications/all');
    setNotifications([]);
    setUnreadCount(0);
    setSuccessMessage('모든 알림이 삭제되었습니다.');
  }, []);

  return {
    notifications,
    unreadCount,
    hasMore,
    isLoading,
    loadMore,
    markAsRead,
    markAllAsRead,
    markDelete,
    markAllDelete,
    successMessage,
    closeSuccessModal,
  };
}
