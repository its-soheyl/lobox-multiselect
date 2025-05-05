import { FC, memo, useEffect, useRef, useState } from "react";
import { LuCheck, LuChevronDown, LuChevronUp } from "react-icons/lu";
import { Input, Menu, MenuItem } from "..";
import useOutSideClick from "../../hooks/useOutSideClick";
import styles from "./MultiSelect.module.scss";
import { IMultiSelectOption } from "./types";

interface IMultiSelectProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  options: IMultiSelectOption<string>[];
  onChange?: (selectedValues: (number | string)[]) => void;
  value?: (number | string)[];
  maxDisplayChars?: number;
}

const MultiSelect: FC<IMultiSelectProps> = memo(({
  options,
  onChange,
  value,
  maxDisplayChars = 30,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<(number | string)[]>(value || []);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedOptions(value);
    }
  }, [value]);

  const toggleOption = (optionValue: number | string) => {
    const newSelectedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter(val => val !== optionValue)
      : [...selectedOptions, optionValue];

    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  const handleInputClick = () => {
    setIsOpen(prev => !prev);
  };

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useOutSideClick(handleClickOutside);

  const getDisplayText = () => {
    const selectedItems = options.filter(option => selectedOptions.includes(option.value));

    if (selectedItems.length === 0) {
      return "";
    }

    let displayText = "";
    let remainingCount = 0;

    for (let i = 0; i < selectedItems.length; i++) {
      const potentialText = displayText
        ? `${displayText}, ${selectedItems[i].label}`
        : selectedItems[i].label;

      if (potentialText.length <= maxDisplayChars) {
        displayText = potentialText;
      } else {
        remainingCount = selectedItems.length - i;
        break;
      }
    }

    if (remainingCount > 0) {
      return `${displayText} +${remainingCount} more`;
    }

    return displayText;
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div onClick={handleInputClick}>
        <Input
          {...props}
          value={getDisplayText()}
          readOnly
          icon={isOpen ? <LuChevronUp /> : <LuChevronDown />}
        />
      </div>

      <Menu open={isOpen}>
        {options.map(option => (
          <MenuItem
            key={option.id}
            selected={selectedOptions.includes(option.value)}
            onClick={() => toggleOption(option.value)}
          >
            <div className={styles.menuItemContent}>
              {option.label}
              {selectedOptions.includes(option.value) && (
                <span className={styles.checkIcon}><LuCheck /></span>
              )}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
});

export default MultiSelect;