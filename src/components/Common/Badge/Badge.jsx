import clsx from 'clsx';
import { badge } from './Badge.css';
import { Quantico } from 'next/font/google';

export const quantico = Quantico({
  preload: false,
  weight: ['700'],
});

export default function Badge({
  children,
  color = 'primary',
  badgeStyle = 'documentType',
  ...props
}) {
  const classNames = [clsx(badge({ color, badgeStyle }),quantico.className)];
  if (badgeStyle === 'field') {
    classNames.push(quantico.className);
  }
  return (
    <span className={classNames.join(' ')} {...props}>
      {children}
    </span>
  );
}
