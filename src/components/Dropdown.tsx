import React, { useState, useMemo } from "react";
import { useOutsideClick } from "@/hooks";

export type DropdownOptionType = {
  label: string,
  value: string
}

export type DropdownProps = {
  name: string,
  value: string,
  onSelected: (newValue: string) => void;
  options: DropdownOptionType[],
  style?: React.CSSProperties,
  placeholder?: string
}

const Dropdown = ({ name, value, onSelected, options, style, placeholder='Select an Option' }: DropdownProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const handleOptionClick = (option: string) => {
    onSelected(option);
  };
  
  const selected = useMemo(() => 
    options.find(option => option.value === value) as DropdownOptionType, [options, value])

  const handleClickOutside = () => setShowOptions(false);
  const ref = useOutsideClick(handleClickOutside);
  
  return (
    <div ref={ref} style={style} onClick={() => setShowOptions(!showOptions)} className="custom-dropdown-container">
      <div className={`custom-dropdown-selected ${!value && 'empty'} ${showOptions && 'open'}`}>
        {selected ? selected.label : placeholder}
      </div>
      {
        showOptions && (
          <ul style={{
            maxHeight: '300px',
            overflowY: 'scroll',
          }} className="custom-dropdown-options">
            {options.map((option, index) => (
              <li
                key={index}
                className="custom-dropdown-option"
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )
      }
      <input type="hidden" name={name} value={value} />
    </div>
  )
}

export default Dropdown
