import * as React from 'react';
import styles from './Dropdown.module.css';

interface DropdownProps {
  items: {
    name: string;
    description: string;
  }[];
  isOpen: boolean;
}

export const Dropdown = ({ items, isOpen }: DropdownProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <ul
      className={`${styles.dropdown} rounded relative shadow-md inline-block m-2 max-w-xs min-w-md max-h-96 overflow-y-auto cursor-pointer`}
    >
      {items.map((item, index) => (
        <li className="px-4 py-2 hover:bg-lightGray-300 last:mb-0" key={`${item.name}${index}`}>
          <p>{item.name}</p>
          <p className="text-xs overflow-ellipsis text-midGray-500 mt-1">{item.description}</p>
        </li>
      ))}
    </ul>
  );
};
