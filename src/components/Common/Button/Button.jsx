import { button } from './Button.css';

export default function Button({
  children,
  color = 'primary',
  size = 'sm',
  rounded = 'md',
  type = 'button',
  width,
  height,
  style,
  ...props
}) {
  return (
    <button className={button({ color, size, rounded })} style={{width, height, ...style}}type={type} {...props}>
      {children}
    </button>
  );
}


