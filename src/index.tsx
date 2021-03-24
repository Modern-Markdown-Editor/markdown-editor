import * as React from 'react';
import styles from './styles.module.css';
import './styles/base.css';
import { Dropdown, DropdownItem } from './components/Dropdown';
export interface MarkdownProps {
  placeholder?: string;
  triggerKey?: string;
}

const items = [
  {
    name: 'Text',
    description: 'Plain text',
  },
  {
    name: 'Heading 1',
    description: 'Big section heading',
  },
  {
    name: 'Heading 2',
    description: 'Medium section heading',
  },
  {
    name: 'Heading 3',
    description: 'Small section heading',
  },
  {
    name: 'Bullet list',
    description: 'List with bullet points',
  },
  {
    name: 'Numbered',
    description: 'List with numbering',
  },
];

export const Markdown = ({ placeholder = 'Type Something', triggerKey = '/' }: MarkdownProps) => {
  const [activeItemIndex, setActiveItemIndex] = React.useState(0);
  const [selectedItem, setSelectedItem] = React.useState<DropdownItem>();

  React.useEffect(() => {
    let element = document.getElementById('content');
  });
  const [dropdownisOpen, setDropdownIsOpen] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    const text = event.target.innerText;
    if (text[text.length - 1] === triggerKey) {
      setDropdownIsOpen(true);
    } else if (dropdownisOpen) {
      setDropdownIsOpen(false);
    }
  };

  const handleOnMouseEnter = (index: number) => {
    setActiveItemIndex(index);
  };

  const handleItemClick = (item: DropdownItem) => {
    setSelectedItem(item);
    setDropdownIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    console.log(event.key);
    if (event.key === 'ArrowUp') {
      if (activeItemIndex === 0) {
        return;
      }
      setActiveItemIndex(activeItemIndex - 1);
    } else if (event.key === 'ArrowDown') {
      if (activeItemIndex === items.length - 1) {
        return;
      }
      setActiveItemIndex(activeItemIndex + 1);
    } else if (event.key === 'Enter') {
      setSelectedItem(items[activeItemIndex]);
      setDropdownIsOpen(false);
    } else if (event.key === 'Escape') {
      setDropdownIsOpen(false);
    }
  };

  console.log('selectedItem', selectedItem);

  return (
    <div className={styles.markdown}>
      <div
        contentEditable={true}
        className={`${styles.test}`}
        placeholder={placeholder}
        onInput={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Dropdown
        isOpen={dropdownisOpen}
        items={items}
        activeItemIndex={activeItemIndex}
        handleItemClick={handleItemClick}
        handleOnMouseEnter={handleOnMouseEnter}
      />
      <input id="content" type="text"></input>
    </div>
  );
};
