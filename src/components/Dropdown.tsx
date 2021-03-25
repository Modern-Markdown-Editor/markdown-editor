import * as React from 'react';
import styles from './Dropdown.module.css';
import classNames from 'classnames';

export interface DropdownItem {
  name: string;
  description: string;
}
interface DropdownProps {
  items: DropdownItem[];
  isOpen: boolean;
  activeItemIndex: number;
  handleOnMouseEnter: (index: number) => void;
  handleItemClick: (item: DropdownItem) => void;
}

export const Dropdown = ({ items, isOpen, activeItemIndex, handleOnMouseEnter, handleItemClick }: DropdownProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ul
      id="dropdown"
      className={`${styles.dropdown} rounded absolute shadow-md inline-block m-2 max-w-xs min-w-md max-h-96 overflow-y-auto cursor-pointer`}
    >
      {items.map((item, index) => (
        <li
          className={classNames({
            'bg-white px-4 py-2 hover:bg-lightGray-300 last:mb-0': true,
            'bg-lightGray-300': index === activeItemIndex,
          })}
          key={`${item.name}${index}`}
          onMouseEnter={() => handleOnMouseEnter(index)}
          onClick={() => handleItemClick(item)}
        >
          <p>{item.name}</p>
          <p className="text-xs overflow-ellipsis text-midGray-500 mt-1">{item.description}</p>
        </li>
      ))}
    </ul>
  );
};
