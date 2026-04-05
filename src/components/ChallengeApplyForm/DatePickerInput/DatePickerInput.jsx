'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import calendar from '@public/img/Calendar.svg';
import * as styles from './DatePickerInput.css.js';

const DateInput = ({ value, onClick, placeholder }) => (
  <div className={styles.dateWrapper}>
    <input
      value={value}
      onClick={onClick}
      placeholder={placeholder}
      className={styles.inputContainer}
      readOnly
    />
    <Image
      src={calendar}
      alt="calendar"
      className={styles.dateImg}
      onClick={onClick}
    />
  </div>
);

export default function DatePickerInput({ value, onChange }) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      placeholderText="날짜를 선택해주세요"
      dateFormat="yyyy년 MM월 dd일"
      customInput={<DateInput />}
      minDate={new Date()}
      popperPlacement="bottom-end"
      popperProps={{ strategy: 'fixed' }}
      portalId="datepicker-portal"
    />
  );
}
