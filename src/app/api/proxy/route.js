export async function GET(request) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return new Response('url 파라미터가 필요합니다.', { status: 400 });
  }

  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  let html = await response.text();

  const origin = new URL(url).origin;

  // frame-busting 스크립트 전체 제거
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // 모든 링크를 새 탭에서 열기
  html = html.replace(/<a\b/gi, '<a target="_blank" rel="noopener noreferrer"');

  // base 태그 주입
  html = html.replace('<head>', `<head><base href="${origin}">`);

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
