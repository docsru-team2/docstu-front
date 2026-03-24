import { format } from 'date-fns';

export function formatDate(dateString, type = 'slash') {
  const formatMap = {
    ko: 'yyyy년 MM월 dd일',
    slash: 'yyyy/MM/dd',
    datetime: 'yyyy/MM/dd HH:mm',
    dot: 'yyyy. MM. dd',

  };

  const dateFormat = formatMap[type] || formatMap['slash'];

  return format(new Date(dateString), dateFormat);
}
