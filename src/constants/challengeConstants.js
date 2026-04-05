export const FIELD_MAP = {
  NEXT_JS: { label: 'Next.js', color: 'nextjs' },
  MODERN_JS: { label: 'Modern JS', color: 'modernjs' },
  API: { label: 'API', color: 'api' },
  WEB: { label: 'Web', color: 'web' },
  CAREER: { label: 'Career', color: 'career' },
};

export const DOCUMENT_TYPE_MAP = {
  OFFICIAL_DOC: '공식문서',
  BLOG: '블로그',
  BOOK: '책',
  ETC: '기타',
};

export const STATUS_MAP = {
  PENDING: { label: '신청 대기', color: 'pending' },
  REJECTED: { label: '신청 거절', color: 'rejected' },
  APPROVED: { label: '신청 승인', color: 'approved' },
  DELETED: { label: '챌린지 삭제', color: 'deleted' },
};

export const REVIEW_STATUS_CONFIG = {
  APPROVED: { color: 'APPROVED', text: '신청 승인된 챌린지입니다.' },
  DELETED: { color: 'DELETED', text: '삭제된 챌린지입니다.' },
  PENDING: { color: 'PENDING', text: '승인 대기 중입니다.' },
  REJECTED: { color: 'REJECTED', text: '신청이 거절되었습니다.' },
};

export const REASON_CONFIG = {
  DELETED: '삭제 사유',
  REJECTED: '신청 거절 사유',
};
