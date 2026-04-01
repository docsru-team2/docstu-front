export function formatLikeCount(count) {
  if (count >= 10000) {
    return '9,999...';
  }
  return count.toLocaleString();
}