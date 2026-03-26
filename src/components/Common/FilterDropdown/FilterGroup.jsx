import checkboxUnchecked from '@public/img/btn/checkboxUnchecked.svg';
import checkboxChecked from '@public/img/btn/checkboxChecked.svg';
import radioUnchecked from '@public/img/btn/radioUnchecked.svg';
import radioChecked from '@public/img/btn/radioChecked.svg';
import Image from 'next/image';
import clsx from 'clsx';
import * as styles from './FilterDropdown.css';

const OptionIcons = {
  checkbox: { checked: checkboxChecked, unchecked: checkboxUnchecked },
  radio: { checked: radioChecked, unchecked: radioUnchecked },
};

export default function FilterGroup({ label, type, value, options, onChange, className }) {
  return (
    <div className={clsx(styles.optionContainer, className)}>
      <div>{label}</div>
      <ul className={styles.options}>
        {options.map((opt) => {
          const checked =
            type === 'checkbox' ? value.includes(opt.value) : value === opt.value;
          return (
            <li key={opt.value}>
              <label className={styles.option}>
                <input
                  type={type}
                  className={styles.hiddenInput}
                  checked={checked}
                  onChange={() => onChange(opt.value)}
                />
                <Image
                  src={checked ? OptionIcons[type].checked : OptionIcons[type].unchecked}
                  alt={type}
                />
                {opt.label}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
