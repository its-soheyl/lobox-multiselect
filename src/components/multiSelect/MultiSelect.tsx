import { FC, memo, useRef, useState } from "react";
import { LuCheck, LuChevronDown, LuChevronUp } from "react-icons/lu";
import useOutSideClick from "../../hooks/useOutSideClick";
import Input from "../input/Input";
import Menu from "../menu/Menu";
import MenuItem from "../menu/MenuItem";
import styles from "./MultiSelect.module.scss";
import { IMultiSelectOption } from "./types";

interface IMultiSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options: IMultiSelectOption<string>[]
}

const MultiSelect: FC<IMultiSelectProps> = memo(({ options, ...props }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<(number | string)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOption = (value: number | string) => {
    setSelectedOptions(prev =>
      prev.includes(value)
        ? prev.filter(optionValue => optionValue !== value)
        : [...prev, value]
    );
  };

  const handleInputClick = () => {
    setIsOpen(prev => !prev);
  };

  // Close the menu when clicking outside
  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useOutSideClick(handleClickOutside)

  return (
    <div className={styles.container} ref={containerRef}>
      <div onClick={handleInputClick}>
        <Input {...props} icon={isOpen ? <LuChevronUp /> : <LuChevronDown />} />
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