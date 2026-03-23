// Button 컴포넌트 사용법
//
// [color] - 버튼 색상 (기본값: primary)
//   primary     : 진한 배경 + 흰 글씨
//   secondary   : 흰 배경 + 테두리
//   viewOriginal: 노란 배경
//   abandon     : 연빨간 배경 (포기/취소)
//   opacity     : 반투명 배경
//
// [size] - 버튼 높이 (기본값: sm)
//   sm : 32px
//   md : 40px
//   lg : 48px
//
// [width] - 너비는 부모 div로 조절 (버튼은 width: 100%)
//   <div style={{ width: '200px' }}>
//     <Button>확인</Button>
//   </div>
//
// [roundBtn] - pill 형태 둥근 버튼
//   <Button roundBtn>확인</Button>
//
// [hasIcon] - 아이콘 이미지 경로 (텍스트 뒤에 렌더링)
//   <Button hasIcon={plusIcon}>추가</Button>
//
// [href] - 링크 버튼 (next/link 사용)
//   <Button href="/page">이동</Button>
//
// [type] - 버튼 타입 (href 없을 때만 적용)
//   button : 일반 클릭 (기본값)
//   submit : 폼 제출
//
// [fontSize] - 기본값 16px fontSize 입력시 14px
// [disabled] - 비활성화
//   <Button disabled>확인</Button>
import Link from 'next/link';
import { button } from './Button.css';
import Image from 'next/image';

export default function Button({
  children,
  color = 'primary',
  size = 'sm',
  href,
  hasIcon,
  roundBtn,
  fontSize,
  type,
  disabled,
  ...props
}) {
  if (href) {
    return (
      <Link
        href={href}
        className={button({
          color,
          size,
          hasIcon: !!hasIcon,
          roundBtn: !!roundBtn,
          fontSize: !!fontSize,
        })}
        {...props}
      >
        {children}
        {hasIcon && <Image src={hasIcon} alt="icon" />}
      </Link>
    );
  }
  return (
    <button
      className={button({
        color,
        size,
        hasIcon: !!hasIcon,
        roundBtn: !!roundBtn,
        fontSize: !!fontSize,
      })}
      disabled={disabled}
      {...props}
      type={type}
    >
      {children}
      {hasIcon && <Image src={hasIcon} alt="icon" />}
    </button>
  );
}
