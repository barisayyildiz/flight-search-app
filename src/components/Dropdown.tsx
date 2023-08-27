import React, { useState, useMemo, useEffect } from "react";
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
  placeholder?: string,
  searchable?: boolean
}

const Dropdown = ({ name, value, onSelected, options, style, placeholder='Select an Option', searchable=false }: DropdownProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [query, setQuery] = useState('');
  
  const handleOptionClick = (option: DropdownOptionType) => {
    if(selected && option.value === selected.value) {
      setQuery(selected.label)
    } else {
      onSelected(option.value);
    }
  };

  const selected = useMemo(() => 
    options.find(option => option.value === value) as DropdownOptionType, [options, value])

  const handleClickOutside = () => setShowOptions(false);
  const ref = useOutsideClick(handleClickOutside);

  useEffect(() => {
    if (selected) {
      setQuery(selected.label);
    } else {
      setQuery('');
    }
  }, [selected]);

  const filteredOptions = options.filter(option => {
    if(!searchable) return true;
    return (
      option.label.toLowerCase().includes(query) ||
      option.value.toLowerCase().includes(query)
    );
  });
  
  return (
    <div ref={ref} style={style} onClick={() => setShowOptions(!showOptions)} className="custom-dropdown-container">
      {
        searchable ? (
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onClick={() => setShowOptions(true)}
            onChange={e => {
              setQuery(e.target.value);
              setShowOptions(true)
            }}
            style={{
              border: 'none',
              padding: '16px',
              width: '100%',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          ></input>
        ) : (
          <div className={`custom-dropdown-selected ${!value && 'empty'} ${showOptions && 'open'}`}>
            {selected ? selected.label : placeholder}
          </div>
        )
      }
      {
        showOptions && (
          <ul style={{
            maxHeight: '300px',
            overflowY: 'scroll',
          }} className="custom-dropdown-options">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className="custom-dropdown-option"
                onClick={() => handleOptionClick(option)}
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
